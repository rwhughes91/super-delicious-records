import { NextApiRequest, NextApiResponse } from 'next'
import { contactAdmin } from '@services/sendgrid/'

export default async function (request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' })
  }
  try {
    await contactAdmin(request.body.email, request.body.message)
    return response.status(200).json({ message: 'Sent' })
  } catch (error) {
    return response.status(500).json({ message: 'Could not send email' })
  }
}
