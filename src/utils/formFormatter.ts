const dateFormatter = (value: string, display: boolean) => {
  if (typeof value === 'string') {
    if (display) {
      if (value.length <= 2) return value
      if (value.charAt(0) === '0') {
        return new Date(value).toLocaleDateString()
      }
      if (!(value.charAt(1) === '/' || value.charAt(2) === '/')) {
        return isNaN(parseInt(value)) ? value : new Date(parseInt(value)).toLocaleDateString()
      }
      return value
    } else {
      if (value.includes('/')) {
        const newDate = new Date(value)
        return newDate.getTime().toString()
      }
      return value
    }
  }
  throw new Error(`Value must be typeof string. ${typeof value} was passed`)
}

const percentageFormatter = (value: string, display: boolean) => {
  if (typeof value === 'string' || typeof value === 'number') {
    if (typeof value === 'string') {
      if (display) {
        if (!value.includes('%')) {
          if (value === '') {
            return '0%'
          }
          return isNaN(parseInt(value)) ? value : `${value}%`
        }
      } else {
        if (value.includes('%')) {
          return parseInt(value.slice(0, value.length))
        }
      }
      return value
    } else {
      if (display) {
        return `${value}%`
      }
      return value
    }
  }
  throw new Error(`Value must of typeof string or number. ${typeof value} was passed`)
}

const currencyFormatter = (value: string, display: boolean) => {
  if (typeof value === 'string' || typeof value === 'number') {
    if (display) {
      let newValue = value
      if (typeof value === 'string') {
        if (value.includes('$')) {
          newValue = newValue.replace(/\$/, '')
        }
        if (value.includes(',')) {
          newValue = newValue.replace(/,/, '')
        }
      }
      return isNaN(parseInt(newValue))
        ? value
        : Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(parseInt(newValue))
    } else {
      let newValue = value
      if (typeof value === 'string') {
        if (value.includes('$')) {
          newValue = newValue.replace(/\$/, '')
        }
        if (value.includes(',')) {
          newValue = newValue.replace(/,/, '')
        }
        if (value === '') {
          newValue = '0'
        }
        return parseFloat(newValue)
      }
      return value
    }
  }
  throw new Error(`Value must of typeof string or number. ${typeof value} was passed`)
}

const titleCaseFormatter = (str: string) => {
  if (typeof str !== 'string') {
    return str
  }
  const strSplit = str.toLowerCase().split(' ')
  const newStr = []
  for (const word of strSplit) {
    newStr.push(word.charAt(0).toUpperCase() + word.slice(1))
  }
  return newStr.join(' ')
}

const formatter = (
  value: string,
  formatters: Array<'date' | 'currency' | 'percent' | 'titleCase'>,
  display = true
): string => {
  let newValue: string | number = value
  for (const formatter of formatters) {
    if (formatter === 'date') {
      newValue = dateFormatter(value, display)
    } else if (formatter === 'currency') {
      newValue = currencyFormatter(value as string, display)
    } else if (formatter === 'percent') {
      newValue = percentageFormatter(value, display)
    } else if (formatter === 'titleCase') {
      newValue = titleCaseFormatter(value as string)
    }
  }
  return newValue.toString()
}

export default formatter
