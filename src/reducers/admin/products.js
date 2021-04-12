import { ACTIONS } from 'actions/admin/products'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  products: {},
  users: {},
  reviews: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminProducts = (state = initialState, action) => {
  let product
  let products
  switch (action.type) {
    case ACTIONS.ADMIN_GET_PRODUCTS:
      products = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        products: products,
      }
    case ACTIONS.ADMIN_GET_PRODUCT:
      const { entities } = normalize(action.res)
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...entities.product },
        users: { ...state.users, ...entities.user },
        reviews: entities.review,
      }
    case ACTIONS.ADMIN_UPDATE_PRODUCT:
      product = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...product },
      }
    case ACTIONS.ADMIN_CREATE_PRODUCT:
      product = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...product },
      }
    case ACTIONS.ADMIN_CREATE_SHOP_PRODUCT:
      const hostUrl = process.env.REACT_APP_SHOPIFY_DOMAIN
      window.location = `https://${hostUrl}/admin/products/${action.res.product_id}`
      return {
        ...state,
        ...successDefaults,
      }
    case ACTIONS.ADMIN_DELETE_PRODUCT:
      products = { ...state.products }
      delete products[action.meta.id]
      return {
        ...state,
        ...successDefaults,
        products: products,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminProducts
