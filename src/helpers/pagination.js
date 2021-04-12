import { PER_PAGE } from 'config'
import appendQuery from 'append-query'

export function paginate(url, page = 1) {
  return appendQuery(url, `page=${page}&per_page=${PER_PAGE}`)
}

export function pageToOffset(page, limit) {
  return page * limit - limit
}

export function offsetToPage(offset, limit) {
  return offset / limit + 1
}
