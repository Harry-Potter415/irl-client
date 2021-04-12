import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'

export const ACTIONS = {
  BRAND_GET_PRODUCTS: 'BRAND_GET_PRODUCTS',
  BRAND_GET_PRODUCT: 'BRAND_GET_PRODUCT',
  BRAND_UPDATE_PRODUCT: 'BRAND_UPDATE_PRODUCT',
  BRAND_CREATE_PRODUCT: 'BRAND_CREATE_PRODUCT',
  BRAND_DELETE_PRODUCT: 'BRAND_DELETE_PRODUCT',
  BRAND_CREATE_SHOPIFY_PRODUCT: 'BRAND_CREATE_SHOPIFY_PRODUCT',
}

export const getProducts = page => {
  const apiRequest = api.get.bind(null, paginate('/api/v1/app/products', page))
  return dispatchAction(ACTIONS.BRAND_GET_PRODUCTS, apiRequest, { page })
}

export const getMyProducts = page => {
  const apiRequest = api.get.bind(null, paginate('/api/v1/app/products/my_products', page))
  return dispatchAction(ACTIONS.BRAND_GET_PRODUCTS, apiRequest, { page })
}

export const getProduct = id => {
  const apiRequest = api.get.bind(null, `/api/v1/app/products/${id}`)
  return dispatchAction(ACTIONS.BRAND_GET_PRODUCT, apiRequest)
}

export const updateProduct = product => {
  const apiRequest = api.put.bind(null, `/api/v1/app/products/${product.id}`, { product })
  return dispatchAction(ACTIONS.BRAND_UPDATE_PRODUCT, apiRequest)
}

export const createProduct = product => {
  const apiRequest = api.post.bind(null, '/api/v1/app/products', { product })
  return dispatchAction(ACTIONS.BRAND_CREATE_PRODUCT, apiRequest)
}

export const createWholesaleProduct = product => {
  const apiRequest = api.post.bind(null, '/api/v1/app/wholesale_products', { product })
  return dispatchAction(ACTIONS.BRAND_CREATE_SHOPIFY_PRODUCT, apiRequest)
}

export const createRetailProduct = product => {
  const apiRequest = api.post.bind(null, '/api/v1/app/retail_products', { product })
  return dispatchAction(ACTIONS.BRAND_CREATE_SHOPIFY_PRODUCT, apiRequest)
}

export const deleteProduct = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/app/products/${id}`)
  return dispatchAction(ACTIONS.BRAND_DELETE_PRODUCT, apiRequest, { id })
}
