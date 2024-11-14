import i18n from '@/i18n'
import { isEmpty, isEmptyArray, isNullOrUndefined } from './validators-helpers'

const { t } = i18n.global

// 👉 Required Validator
export const requiredValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) {
    return t('validation.required')
  }

  return !!String(value).trim().length || t('validation.required')
}

// 👉 Email Validator
export const emailValidator = value => {
  if (isEmpty(value)) return true

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value)) {
    return (
      value.every(val => re.test(String(val))) || t('validation.email.valid')
    )
  }

  return re.test(String(value)) || t('validation.email.valid')
}

// 👉 Password Validator
export const passwordValidator = password => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword || t('validation.password.valid')
  )
}

// 👉 Password Validator
export const passwordSoftValidator = password => {
  const regExp = /.{8,}/
  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword || t('validation.password.valid')
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) =>
  value === target || t('validation.password.confirm')

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  )
}

// 👉 Integer Validator
export const integerValidator = value => {
  if (isEmpty(value)) return true
  if (Array.isArray(value)) {
    return (
      value.every(val => /^-?[0-9]+$/.test(String(val))) ||
      t('validation.numeric')
    )
  }

  return /^-?[0-9]+$/.test(String(value)) || t('validation.numeric')
}

// 👉 Regex Validator
export const regexValidator = (value, regex, message) => {
  if (isEmpty(value)) return true
  let regeX = regex
  if (typeof regeX === 'string') regeX = new RegExp(regeX)
  if (Array.isArray(value)) {
    return value.every(val => regexValidator(val, regeX))
  }

  return regeX.test(String(value)) || message
}

// 👉 Alpha Validator
export const alphaValidator = value => {
  if (isEmpty(value)) return true

  return (
    /^[A-Z]*$/i.test(String(value)) ||
    'The Alpha field may only contain alphabetic characters'
  )
}

// 👉 URL Validator
export const urlValidator = value => {
  if (isEmpty(value)) return true

  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(String(value)) || t('url_validation')
}

export const urlAdvancedValidator = value => {
  const re =
    /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

  return re.test(String(value)) || t('url_validation')
}

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value)) return true

  return (
    String(value).length === length ||
     `${t('min_length')} ${length}`
  )
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = value => {
  if (isEmpty(value)) return true
  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character are not valid'
}

// 👉 Alpha-dash Validator
export const moneyValidator = value => {
  if (isEmpty(value)) return true
  const valueAsString = String(value)

  return /^\d+(\.\d{1,2})?$/i.test(valueAsString) || t('money_validation')
}

export const dateMinValidator = (value, date = new Date().toString()) => {
  if (isEmpty(value)) return true

  const isValid = new Date(value) >= new Date(date)

  if (isValid) return true

  return 'الرجاء إدخال تاريخ صالح'
}

export const radiusRangeValidator = value => {
  if (isEmpty(value)) return true

  const isValid = value >= 96 && value <= 100000

  if (isValid) return true

  return t('snapchat_radius_validation', {
    min: 96,
    max: 100000,
  })
}

export const snapchatImageSizeValidator = value => {
  return (
    !value ||
    !value.length ||
    value[0].size <= 5000000 ||
    'Size should be less than 5 MB!'
  )
}

export const snapchatVideoSizeValidator = value => {
  return (
    !value ||
    !value.length ||
    value[0].size <= 1000000000 ||
    'Size should be less than 1 GB!'
  )
}

export const minIntValidator = (value, min) => {
  if (isEmpty(value)) return true
  if (Array.isArray(value)) {
    return (
      value.every(val => /^-?[0-9]+$/.test(String(val))) ||
      t('validation.numeric')
    )
  }

  if (+value < min) return t('validation.low_daily_budget.valid', { min })

  return /^-?[0-9]+$/.test(String(value)) || t('validation.numeric')
}

export const tiktokVideoSizeValidator = value => {
  return (
    !value ||
    !value.length ||
    value[0].size <= 500000000 ||
    'Size should be less than 500 MB!'
  )
}

export const isVideoFile = file => {
  const videoExtensions = ['mp4', 'mov', 'mpeg', '3gp', 'avi']

  if (!file || !file.name) {
    return t('extension_not_allowed')
  }

  const fileExtension = file.name
    .slice(file.name.lastIndexOf('.'))
    .toLowerCase()
  return videoExtensions.includes(fileExtension)
}

export const isImageFile = file => {
  // List of accepted image file extensions
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.tiff',
    '.svg',
    '.webp',
  ]

  if (!file || !file.name) {
    return false
  }

  const fileExtension = file.name
    .slice(file.name.lastIndexOf('.'))
    .toLowerCase()

  return imageExtensions.includes(fileExtension) || t('extension_not_allowed')
}
