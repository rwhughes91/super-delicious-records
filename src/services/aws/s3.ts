import AWS from 'aws-sdk'

export const bucket = process.env.S3_BUCKET_NAME || ''

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
})

export default s3

export const uploadFile = async (body: Buffer, key: string): Promise<boolean> => {
  const params = {
    Body: body,
    Bucket: bucket,
    Key: key,
  }
  s3.upload(params, (error: Error) => {
    if (error) {
      throw new Error('Could not upload image')
    }
  })
  return true
}
