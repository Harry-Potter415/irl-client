export const isEmail = value => {
  let regEx = /\S+@\S+\.\S+/
  if (value && !regEx.test(value)) {
    return false
  } else {
    return true
  }
}

export const notEmpty = value => {
  if (value === null || value === undefined || value === '' || value.length === 0) {
    return false
  } else {
    return true
  }
}

export const minLength = (length, value) => {
  if (value && value.length < length) {
    return false
  } else {
    return true
  }
}

export const isTruthy = value => {
  return !!value
}

export const isWebsiteUrl = value => {
  // @see http://urlregex.com/
  // eslint-disable-next-line no-useless-escape
  const urlRegEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  return !value || !!urlRegEx.test(value) // missing values are allowed
}

export const isPositive = (value, strictlyPositive = false) =>
  !value || (strictlyPositive ? value > 0 : value >= 0)
