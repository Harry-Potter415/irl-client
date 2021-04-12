export const buildOptions = (items, key, value) => {
  if (!items && !items.data) return null
  let options = []
  let list = []
  if (items.data) {
    list = items.data
  } else {
    list = items
  }
  list.forEach((item, idx) => {
    let label = item[value]
    if (Array.isArray(value)) {
      // eslint-disable-next-line no-eval
      label = value.map(v => eval(`item.${v}`)).join(' - ') // FIXME: item[v] should work
    }
    return options.push({ value: item[key], label: label })
  })
  return options
}

export const isProd = () => {
  if (window.location.hostname === 'localhost') {
    return false
  } else {
    return true
  }
}

export function formatDigits(amount) {
  let decimalCount = 0
  let decimal = '.'
  let thousands = ','
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    let formatted =
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    return formatted
  } catch (e) {
    console.log(e)
  }
}

export function formatCurrency(amount) {
  let formatted = Number(amount).toFixed(2)
  return `$${formatted}`
}

export const syntheticEvent = (value, name, type = 'text') => {
  let ev = {
    target: {
      value,
      name,
      type,
    },
  }
  return ev
}

export const capitalize = string => {
  if (!string) {
    return
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const truncate = (text, len) => {
  if (!text) {
    return
  }
  let truncated = text.slice(0, len)
  if (text.length > len) {
    truncated += '...'
  }
  return truncated
}

export const generateToken = (len = 5) => {
  let token = [...Array(len)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join('')
    .toUpperCase()
  return token
}

export const isPersisted = resp => {
  return resp && resp.data && resp.data.id
}

export const isLoaded = resp => {
  return resp && resp.data ? true : false
}

export const isEmpty = resources => {
  return !(resources && resources.data && resources.data.length > 0)
}

// can be used in an async func: await delay(sec)
export const delay = sec => new Promise(res => setTimeout(res, sec * 1000))
