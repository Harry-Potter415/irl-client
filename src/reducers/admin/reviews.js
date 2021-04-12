import { ACTIONS } from 'actions/admin/reviews'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  reviews: {},
  products: {},
  images: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminReviews = (state = initialState, action) => {
  let reviews
  let products
  let entities
  let images
  switch (action.type) {
    case ACTIONS.ADMIN_GET_REVIEWS:
      reviews = normalize(action.res).entities.review
      products = normalize(action.res).entities.product
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        reviews: reviews,
        products: products,
      }
    case ACTIONS.ADMIN_GET_REVIEW:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        reviews: entities.review,
        products: entities.product,
        images: entities.image,
      }
    case ACTIONS.APPROVE_REVIEWS:
      reviews = normalize(action.res).entities.review
      return {
        ...state,
        ...successDefaults,
        reviews: { ...state.reviews, ...reviews },
      }
    case ACTIONS.REJECT_REVIEWS:
      reviews = normalize(action.res).entities.review
      return {
        ...state,
        ...successDefaults,
        reviews: { ...state.reviews, ...reviews },
      }
    case ACTIONS.APPROVE_REVIEW_IMAGES:
      images = normalize(action.res).entities.image
      return {
        ...state,
        ...successDefaults,
        images: { ...state.images, ...images },
      }
    case ACTIONS.REJECT_REVIEW_IMAGES:
      images = normalize(action.res).entities.image
      return {
        ...state,
        ...successDefaults,
        images: { ...state.images, ...images },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminReviews
