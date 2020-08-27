import * as admin from 'firebase-admin'
import firebaseServiceAccount from '../../../serviceAccount.json'

const serviceAccount = firebaseServiceAccount as admin.ServiceAccount

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin

const database = admin.database()

export async function pushDataToDatabase<T>(location: string, data: T): Promise<string | null> {
  const newItem = await database.ref(location).push()
  await newItem.set(data)
  return newItem.key
}

export async function getDataArray<T>(location: string): Promise<T[]> {
  const ref = database.ref(location)
  const dataArray: T[] = await new Promise((resolve) => {
    ref.once('value', (snapshot) => {
      const res = snapshot.val()
      const newArray = []
      for (const key in res) {
        newArray.push({
          ...res[key],
          pid: key,
        })
      }
      resolve(newArray)
    })
  })
  return dataArray
}

export async function getDataItem<T>(location: string): Promise<T> {
  const ref = database.ref(location)
  const data: T = await new Promise((resolve) => {
    ref.once('value', (snapshot) => {
      const res = snapshot.val()
      const dataItem = {
        ...res,
        pid: ref.key,
      }
      resolve(dataItem)
    })
  })
  return data
}
