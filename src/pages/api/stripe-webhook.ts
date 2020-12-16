import stripe from '@services/stripe/'
import { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import * as typeDefs from '@generated/graphql'
import { round } from '@utils/helpers'
import { createDataItem, removeDataItemFromList } from '@services/firebase/admin'
import { emailNewOrderNotice, emailNewOrderNoticeError } from '@services/sendgrid/'

interface Session {
  client_reference_id: string | null
  amount_total: number
  id: string
}

export default async function (request: NextApiRequest, response: NextApiResponse): Promise<void> {
  const payload = await getRawBody(request)
  const signature = request.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature ?? '',
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`)
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Session
    try {
      if (session.client_reference_id) {
        const order: typeDefs.OrderInput = {
          amount: round(session.amount_total / 100, 2),
          currency: 'usd',
          date: new Date(Date.now()).toLocaleDateString(),
          items: [],
        }
        const { data } = await stripe.checkout.sessions.listLineItems(session.id)
        for (const lineItem of data) {
          const product = await stripe.products.retrieve(lineItem.price.product as string)
          order.items.push({
            shopPid: product.metadata.shopPid,
            qty: lineItem.quantity as number,
            purchasePrice: round((lineItem.price.unit_amount as number) / 100, 2),
            color: product.metadata.color,
            size: typeDefs.Size.Medium,
            shopItem: {
              name: lineItem.description,
              price: round((lineItem.price.unit_amount as number) / 100, 2),
              images: [
                {
                  imageUrl: '',
                  imageSetUrl: '',
                  base64: '',
                  alt: '',
                  color: product.metadata.color,
                },
              ],
            },
          })
        }
        const newPid = await createDataItem('/orders', {
          ...order,
          uid: session.client_reference_id,
        })
        await emailNewOrderNotice(newPid, session.client_reference_id)
        await removeDataItemFromList(`/users/${session.client_reference_id}/cart`)
      } else {
        await emailNewOrderNotice(session.id)
      }
    } catch (error) {
      console.log(error.message)
      emailNewOrderNoticeError()
    }
  }
  response.status(200).json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
