import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import appendQuery from 'append-query'

export const ACTIONS = {
  CREATE_ORDER: 'CREATE_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  GET_ORDERS: 'GET_ORDERS',
  GET_ORDER: 'GET_ORDER',
}

export const createOrder = order => {
  const apiRequest = api.post.bind(null, '/api/v1/app/orders', { order })
  return dispatchAction(ACTIONS.CREATE_ORDER, apiRequest)
}

export const updateOrder = (checkoutId, order) => {
  const apiRequest = api.put.bind(null, `/api/v1/app/orders/${checkoutId}`, { order })
  return dispatchAction(ACTIONS.UPDATE_ORDER, apiRequest)
}

export const getOrders = filters => {
  let url = '/api/v1/app/orders'
  if (filters.orderNumber) url = appendQuery(url, `order_number=${filters.orderNumber}`)
  if (filters.status) url = appendQuery(url, `status=${filters.status}`)
  const apiRequest = api.get.bind(null, url)
  return dispatchAction(ACTIONS.GET_ORDERS, apiRequest)
}

export const getOrder = id => {
  const apiRequest = api.get.bind(null, `/api/v1/app/orders/${id}`)
  return dispatchAction(ACTIONS.GET_ORDER, apiRequest)
}
