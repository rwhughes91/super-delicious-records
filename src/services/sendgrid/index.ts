import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function emailNewOrderNotice(pid: string, uid?: string): Promise<void> {
  try {
    await sgMail.send({
      to: process.env.ADMIN_EMAIL,
      from: 'orders@superdeliciousrecords.com',
      subject: 'New Order',
      html: `
        <p>There has been a new order: ${pid}, ${
        uid ? 'by user: ' + uid : 'purchases anonymously'
      }.</p> 
      `,
    })
  } catch (error) {
    throw new Error('Could not send order email')
  }
}

export async function emailNewOrderNoticeError(): Promise<void> {
  try {
    await sgMail.send({
      to: process.env.ADMIN_EMAIL,
      from: 'orders@superdeliciousrecords.com',
      subject: 'New Order',
      html: `
        <p>There has been a new order and adding to firebase threw an error</p> 
      `,
    })
  } catch (error) {
    throw new Error('Could not send order email')
  }
}

export async function contactAdmin(email: string, message: string): Promise<void> {
  try {
    await sgMail.send({
      to: process.env.ADMIN_EMAIL,
      from: email,
      subject: 'Contact Inquiry',
      html: `
        <p>${message}</p> 
      `,
    })
  } catch (error) {
    throw new Error('Could not send email')
  }
}
