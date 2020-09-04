import * as admin from 'firebase-admin'
import firebaseServiceAccount from '../../../serviceAccount.json'
import { shaveObject } from '@utils/helpers'
import { Order as OrderType } from '@resolvers/shop/order'
import { ShopItem as ShopItemType } from '@resolvers/shop/shop'

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

function resolveOnValue<T>(ref: admin.database.Query | admin.database.Reference): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      ref.once('value', (snapshot: admin.database.DataSnapshot) => {
        const res = snapshot.val()
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function pushDataToDatabase<T>(location: string, data: T): Promise<string | null> {
  const newItem = await database.ref(location).push()
  await newItem.set(data)
  return newItem.key
}

export async function createDataItem<T>(location: string, data: T): Promise<string> {
  const shavedInput = shaveObject(data)
  const newPid = await pushDataToDatabase<T>(location, shavedInput)
  return newPid || ''
}

export async function createDataItemWithPid<T extends { pid: string }>(
  location: string,
  data: T
): Promise<true | string> {
  const shavedInput = shaveObject(data)
  const pid = shavedInput.pid
  delete shavedInput.pid
  try {
    await database.ref(location + '/' + pid).set(shavedInput)
    return true
  } catch (error) {
    return error.message
  }
}

export async function setListOfData<T>(location: string, data: T[]): Promise<true | string> {
  const ref = database.ref(location)
  const shavedData = []
  for (const dataObj of data) {
    shavedData.push(shaveObject(dataObj))
  }
  try {
    await ref.set(shavedData)
    return true
  } catch (error) {
    return error.message
  }
}

export async function mergeListOfData<T>(location: string, data: T[]): Promise<true | string> {
  const ref = database.ref(location)
  const shavedData = []
  for (const dataObj of data) {
    shavedData.push(shaveObject(dataObj))
  }
  try {
    const currentCart = await resolveOnValue<T[]>(ref)
    for (const currentCartItem of currentCart) {
      shavedData.unshift(currentCartItem)
    }
    await ref.set(shavedData)
    return true
  } catch (error) {
    return error.message
  }
}

export async function getDataArray<T>(location: string): Promise<T[]> {
  const ref = database.ref(location)
  try {
    const res = await resolveOnValue<T[]>(ref)
    const data: T[] = []
    for (const key in res) {
      data.push({
        ...res[key],
        pid: key,
      })
    }
    return data
  } catch (_) {
    throw new Error(
      'Database query did not resolve on value. Check internet connection and/or ref object.'
    )
  }
}

export async function getDataItem<T>(location: string): Promise<T> {
  const ref = database.ref(location)
  try {
    const res = await resolveOnValue<T>(ref)
    const data = {
      ...res,
      pid: ref.key,
    }
    return data
  } catch (_) {
    throw new Error(
      'Database query did not resolve on value. Check internet connection and/or ref object.'
    )
  }
}

export async function getChildrenEqualTo<T>(
  location: string,
  key: string,
  value: number | string | boolean
): Promise<T[]> {
  const ref = database.ref(location).orderByChild(key).equalTo(value)
  const data: T[] = await new Promise((resolve) => {
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
  return data
}

export async function getUsersOrdersWithShopItem(uid: string): Promise<OrderType[]> {
  const userOrders = database.ref('/orders').orderByChild('uid').equalTo(uid)
  const shopRef = database.ref('/shop')
  const userOrdersData = await resolveOnValue<OrderType[]>(userOrders)
  const ordersWithShopData = []
  for (const orderPid in userOrdersData) {
    const items = userOrdersData[orderPid].items
    const orderItemsWithShopData = []
    for (const item of items) {
      const shopItem = await resolveOnValue<ShopItemType>(shopRef.child(item.shopPid))
      const shopItemWithPid = { ...shopItem, pid: item.shopPid, images: [shopItem.images[0]] }
      orderItemsWithShopData.push({ ...item, shopItem: shopItemWithPid })
    }
    ordersWithShopData.push({
      ...userOrdersData[orderPid],
      pid: orderPid,
      items: orderItemsWithShopData,
    })
  }
  return ordersWithShopData
}

export async function removeDataItemFromList(location: string): Promise<true | string> {
  try {
    await database.ref(location).remove()
    return true
  } catch (error) {
    return error.message
  }
}
