import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_PRODUCTS: 'ADMIN_GET_PRODUCTS',
  ADMIN_GET_PRODUCT: 'ADMIN_GET_PRODUCT',
  ADMIN_UPDATE_PRODUCT: 'ADMIN_UPDATE_PRODUCT',
  ADMIN_CREATE_PRODUCT: 'ADMIN_CREATE_PRODUCT',
  ADMIN_CREATE_SHOP_PRODUCT: 'ADMIN_CREATE_SHOP_PRODUCT',
  ADMIN_DELETE_PRODUCT: 'ADMIN_DELETE_PRODUCT',
}

export const getProducts = (filters, page) => {
  let url = '/api/v1/admin/products'
  if (filters.id) url = appendQuery(url, `id=${filters.id}`)
  if (filters.title) url = appendQuery(url, `title=${filters.title}`)
  if (filters.brand) url = appendQuery(url, `brand=${filters.brand}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_PRODUCTS, apiRequest, { page })
}

export const getProduct = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/products/${id}`)
  return dispatchAction(ACTIONS.ADMIN_GET_PRODUCT, apiRequest)
}

export const updateProduct = product => {
  const apiRequest = api.put.bind(null, `/api/v1/admin/products/${product.id}`, { product })
  return dispatchAction(ACTIONS.ADMIN_UPDATE_PRODUCT, apiRequest)
}

export const createProduct = product => {
  const apiRequest = api.post.bind(null, '/api/v1/admin/products', { product })
  return dispatchAction(ACTIONS.ADMIN_CREATE_PRODUCT, apiRequest)
}

export const createShopProduct = product => {
  const apiRequest = api.post.bind(null, '/api/v1/admin/shop/products', { product })
  return dispatchAction(ACTIONS.ADMIN_CREATE_SHOP_PRODUCT, apiRequest)
}

export const deleteProduct = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/admin/products/${id}`)
  return dispatchAction(ACTIONS.ADMIN_DELETE_PRODUCT, apiRequest, { id })
}
