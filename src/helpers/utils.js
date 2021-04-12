import moment from 'moment'

export const truncate = (str, length, ending) => {
  if (length == null) {
    length = 100
  }
  if (ending == null) {
    ending = '...'
  }
  if (str && str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function titleize(string) {
  let string_array = string.split(' ')
  string_array = string_array.map(str => capitalize(str))
  return string_array.join(' ')
}

export function titleizeUnderscore(string) {
  return titleize(string.replace(/_/g, ' '))
}

export function isMobile() {
  return window.innerWidth < 600
}

export function isMobileOrTablet() {
  return window.innerWidth < 960
}

export function formatDate(date) {
  return moment(date).format('MM/DD/YYYY')
}

export function formatShortDate(date) {
  return moment(date).format('MM/DD/YY')
}

export function formatFullDate(date) {
  return moment(date).format('MMMM DD, YYYY [at] h:mm a')
}
