import { ObjectType, Field, Arg, Resolver, Mutation, Ctx } from 'type-graphql'
import { ResolverContext } from '../../types/resolver'
import stripe from '@services/stripe/'
import { CartItemInput } from '../shop/cart'
import { formatAmountForStripe } from '@utils/helpers'

@ObjectType()
class StripeId {
  @Field({ nullable: true })
  id: string | undefined | null
}

@Resolver()
export default class StripeResolvers {
  @Mutation(() => StripeId)
  async stripeCreateOrder(
    @Arg('data', () => [CartItemInput]) data: CartItemInput[],
    @Ctx() ctx: ResolverContext
  ): Promise<StripeId> {
    const lineItems = []
    for (const cartItem of data) {
      lineItems.push({
        quantity: cartItem.qty,
        price_data: {
          currency: 'usd',
          unit_amount_decimal: formatAmountForStripe(cartItem.shopItem.price, 'usd').toString(),
          product_data: {
            name: cartItem.shopItem.name,
            description: `Size: ${cartItem.size}, Color: ${cartItem.color}`,
            // images: [cartItem.shopItem.images[0].imageUrl],
            metadata: {
              shopPid: cartItem.shopPid,
              size: cartItem.size || null,
              color: cartItem.color || null,
            },
          },
        },
      })
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
        customer_email: ctx.me?.email,
        client_reference_id: ctx.me?.uid,
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${ctx.req.headers.origin}/shop/success`,
        cancel_url: `${ctx.req.headers.origin}/shop/cart?cancelled=true`,
      })
    } catch (error) {
      throw new Error(error)
    }
    return { id: session.id }
  }
}
