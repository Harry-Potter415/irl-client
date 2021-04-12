import { ACTIONS } from 'actions/public/reviews'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  receivedProducts: {},
  users: {},
  reviews: {},
}

const publicReviews = (state = initialState, action) => {
  let entities
  switch (action.type) {
    case ACTIONS.GET_PUBLIC_USER:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        receivedProducts: { ...state.receivedProducts, ...entities.receivedProduct },
        users: { ...state.users, ...entities.user },
        reviews: { ...state.reviews, ...entities.review },
      }
    case ACTIONS.CREATE_REVIEW:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        reviews: { ...state.reviews, ...entities.review },
      }
    case ACTIONS.UPDATE_REVIEW:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        reviews: { ...state.reviews, ...entities.review },
      }
    case ACTIONS.SET_REVIEWS_USER:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        reviews: { ...state.reviews, ...entities.review },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default publicReviews
