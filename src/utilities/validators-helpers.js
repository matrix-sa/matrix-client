// 👉 IsEmpty
export const isEmpty = value => {
  if (value === null || value === undefined || value === '') return true

  return !!(Array.isArray(value) && value.length === 0)
}
export const snackToPascal = str => {
  const strings = str.split('_')

  const pascalStrings = strings.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  )

  return pascalStrings.join('')
}
export const pascalToSnack = str => {
  return str
    .replace(/\.?([A-Z])/g, function (x, y) {
      return '_' + y.toLowerCase()
    })
    .replace(/^_/, '')
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = value => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = obj =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
export const isToday = date => {
  const today = new Date()

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const getAspectRatio = (width, height) => {
  const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : gcd(y, x % y))

    return [...arr].reduce((a, b) => _gcd(a, b))
  }

  const gcdResult = gcd(width, height)

  return `${width / gcdResult}:${height / gcdResult}`
}

export const convertToCamelCase = inputString => {
  return inputString
    .replace(/_([a-z])/g, function (match, group) {
      return group.toUpperCase()
    })
    .replace(/^[a-z]/, function (match) {
      return match.toUpperCase()
    })
}
