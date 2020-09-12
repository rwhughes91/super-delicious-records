import { NextApiRequest, NextApiResponse } from 'next'
import firebaseAdmin from '@services/firebase/admin'
import { IncomingForm, Files, Fields } from 'formidable'
import { promises as fs } from 'fs'
import sharp from 'sharp'
import { uploadFile } from '@services/aws/s3'

// import { putObject } from '@services/aws/s3'

export default async function (request: NextApiRequest, response: NextApiResponse): Promise<void> {
  let authToken = request.headers.authorization || ''
  if (!authToken) {
    return response.status(401).json({ statusCode: 401, message: 'Not authenticated' })
  }
  authToken = authToken.split(' ')[1]
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(authToken)
    const uid = decodedToken.uid
    const user = await firebaseAdmin.auth().getUser(uid)
    const hasAdminRole = user.customClaims && user.customClaims['admin']
    if (!hasAdminRole) {
      throw new Error('')
    }
  } catch (error) {
    return response.status(403).json({ message: 'Not admin' })
  }
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method must be POST' })
  }
  const data: { fields: Fields; files: Files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(request, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
  const contents = await fs.readFile(data.files.files.path)
  const fileNames = data.files.files.name.split('.')

  const uploadErrors = []
  const imageSetUrl = []

  for (const size of SIZES) {
    const resizedImage = await resizeImage(contents, size)
    imageSetUrl.push(`${fileNames[0]}-${size}.${fileNames[1]} ${size}w`)
    const key = `${fileNames[0]}/${fileNames[0]}-${size}.${fileNames[1]}`
    try {
      await uploadFile(resizedImage, key)
    } catch (error) {
      uploadErrors.push({ errorMessage: `Could not upload ${key}`, size: size })
    }
  }
  return response.status(200).json({ message: 'finished', errors: uploadErrors, imageSetUrl })
}

const SIZES = [100, 150, 300, 560, 600, 768, 1000]

const resizeImage = (image: Buffer, size: number) => {
  return sharp(image).resize(size).toBuffer()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
