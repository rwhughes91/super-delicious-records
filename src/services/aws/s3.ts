import AWS from 'aws-sdk'

export const bucket = process.env.S3_BUCKET_NAME || ''

export default new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})
