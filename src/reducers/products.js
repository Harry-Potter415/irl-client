import { ACTIONS } from 'actions/products'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  products: {},
  reviews: {},
  isFetching: false,
  isFetched: false,
}

const brandProducts = (state = initialState, action) => {
  let product
  let products
  let entities
  switch (action.type) {
    case ACTIONS.BRAND_GET_PRODUCTS:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        products: entities.product,
      }
    case ACTIONS.BRAND_GET_PRODUCT:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...entities.product },
        reviews: entities.review,
      }
    case ACTIONS.BRAND_UPDATE_PRODUCT:
      product = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...product },
      }
    case ACTIONS.BRAND_CREATE_PRODUCT:
      product = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        products: { ...state.products, ...product },
      }
    case ACTIONS.BRAND_CREATE_SHOPIFY_PRODUCT:
      return {
        ...state,
        ...successDefaults,
      }
    case ACTIONS.BRAND_DELETE_PRODUCT:
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

export default brandProducts
