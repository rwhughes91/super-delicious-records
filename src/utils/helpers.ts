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

export function extractFields<T, K extends keyof T>(columns: K[], data: T[]): Partial<T>[] {
  const trimmedData = []
  for (const datum of data) {
    trimmedData.push({})
    const lastIndex: number = trimmedData.length - 1
    for (const column of columns) {
      if (isKey(column, datum)) {
        trimmedData[lastIndex] = {
          ...trimmedData[lastIndex],
          [column]: datum[column],
        }
      } else {
        throw new Error(`Key is not a column. ${column}`)
      }
    }
  }
  return trimmedData
}

export function convertFieldsToParams<T, K extends keyof T>(columns: K[], data: T[]): any {
  const paths = []
  for (const datum of data) {
    paths.push({
      params: {},
    })
    const lastIndex: number = paths.length - 1
    for (const column of columns) {
      if (isKey(column, datum)) {
        paths[lastIndex].params = {
          ...paths[lastIndex].params,
          [column]: datum[column],
        }
      } else {
        throw new Error(`Key is not a column. ${column}`)
      }
    }
  }
  return paths
}

export function sliceArray(arr: any[], index: number): any[] {
  return arr.slice(0, index).concat(arr.slice(index + 1))
}

export function round(value: number, decimals = 2) {
  return parseFloat(value.toFixed(decimals))
}

export abstract class Authenticator {
  abstract NAME: string
  authenticate(): void {
    for (const key in this) {
      if (!this[key]) {
        throw new Error(`${key} is required for ${this.NAME}`)
      }
    }
  }
}
