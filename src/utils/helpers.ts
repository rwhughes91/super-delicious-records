export function isKey<T>(x: string | number | symbol, y: T): x is keyof T {
  return x in y
}

export function shaveObject<T>(obj: T): T {
  const shavedObj = { ...obj }
  for (const key in shavedObj) {
    if (isKey(key, shavedObj)) {
      if (shavedObj[key] === undefined) {
        delete shavedObj[key]
      }
    }
  }
  return shavedObj
}
