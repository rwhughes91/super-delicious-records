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

export function round(value: number, decimals = 2): number {
  return parseFloat(value.toFixed(decimals))
}

export abstract class Authenticator {
  abstract NAME: string
  abstract requiredKeys: string[]
  authenticate(): void {
    for (const key of this.requiredKeys) {
      if (isKey(key, this)) {
        if (!this[key]) {
          throw new Error(`${key} is required for ${this.NAME}`)
        }
      }
    }
  }
}

export function formatAmountForStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

export function formatAmountForDisplay(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}
