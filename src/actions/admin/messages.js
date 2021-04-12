import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_MESSAGES: 'ADMIN_GET_MESSAGES',
}

export const getMessages = (filters, page) => {
  let url = '/api/v1/admin/text_messages'
  if (filters.id) url = appendQuery(url, `id=${filters.id}`)
  if (filters.phone_number) url = appendQuery(url, `phone_number=${filters.phone_number}`)
  if (filters.message) url = appendQuery(url, `message=${filters.message}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_MESSAGES, apiRequest, { page })
}
