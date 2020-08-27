import validator from 'validator'

export interface Rules {
  required?: boolean
  minLength?: number
  maxLength?: number
  numberMax?: number
  numberMin?: number
  numberRange?: [number, number]
  notEqual?: string
  equal?: [string, string]
  isNumber?: boolean
  isYear?: boolean
  isMonth?: boolean
  isCurrency?: boolean
  isDate?: boolean
  isEmail?: boolean
}

const formValidation = (value: string, rules: Rules): [boolean, string] => {
  let isValid = true
  let errorMessage = ''
  if (rules.required) {
    isValid = value.toString().trim() !== '' && isValid
    if (!isValid) {
      errorMessage = 'Required'
      return [isValid, errorMessage]
    }
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
    if (!isValid) {
      errorMessage = `Must be over ${rules.minLength - 1} chars`
      return [isValid, errorMessage]
    }
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
    if (!isValid) {
      errorMessage = `Must be under ${rules.maxLength + 1} chars`
      return [isValid, errorMessage]
    }
  }
  if (rules.isNumber) {
    isValid = !isNaN(parseInt(value)) && isValid
    if (!isValid) {
      errorMessage = `Must be a number`
      return [isValid, errorMessage]
    }
  }
  if (rules.numberMax) {
    const isNumber = !isNaN(parseInt(value))
    isValid = isNumber && parseInt(value) <= rules.numberMax && isValid
    if (!isValid) {
      errorMessage = `Must be a number under ${rules.numberMax + 1}`
      return [isValid, errorMessage]
    }
  }
  if (rules.numberMin) {
    const isNumber = !isNaN(parseInt(value))
    isValid = isNumber && parseInt(value) >= rules.numberMin && isValid
    if (!isValid) {
      errorMessage = `Must be a number over ${rules.numberMin - 1}`
      return [isValid, errorMessage]
    }
  }
  if (rules.numberRange) {
    const isNumber = !isNaN(parseInt(value))
    isValid =
      isNumber &&
      rules.numberRange[0] <= parseInt(value) &&
      parseInt(value) <= rules.numberRange[1] &&
      isValid
    if (!isValid) {
      errorMessage = `Must be a number between ${rules.numberRange[0]} and ${rules.numberRange[1]}`
      return [isValid, errorMessage]
    }
  }
  if (rules.isYear) {
    isValid = !isNaN(parseInt(value)) && value.length === 4 && isValid
    if (!isValid) {
      errorMessage = `Must be a year`
      return [isValid, errorMessage]
    }
  }
  if (rules.isMonth) {
    isValid = !isNaN(parseInt(value)) && 1 <= parseInt(value) && parseInt(value) <= 12 && isValid
    if (!isValid) {
      errorMessage = `Must be a month`
      return [isValid, errorMessage]
    }
  }
  if (rules.isCurrency) {
    isValid = validator.isCurrency(value) && isValid
    if (!isValid) {
      errorMessage = 'Must be a currency'
      return [isValid, errorMessage]
    }
  }
  if (rules.isDate) {
    const date = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/
    isValid = date.test(value) && isValid
    if (!isValid) {
      errorMessage = 'Must be a valid date'
      return [isValid, errorMessage]
    }
  }
  if (rules.notEqual) {
    isValid = value !== rules.notEqual && isValid
    if (!isValid) {
      errorMessage = `Cant equal ${rules.notEqual}`
      return [isValid, errorMessage]
    }
  }
  if (rules.equal) {
    isValid = value === rules.equal[0] && isValid
    if (!isValid) {
      errorMessage = rules.equal[1]
      return [isValid, errorMessage]
    }
  }
  if (rules.isEmail) {
    isValid = validator.isEmail(value) && isValid
    if (!isValid) {
      errorMessage = `Must be a valid email`
      return [isValid, errorMessage]
    }
  }
  return [isValid, errorMessage]
}

export default formValidation
