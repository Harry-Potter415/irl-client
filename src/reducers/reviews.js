import { ACTIONS } from 'actions/reviews'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  myReviews: {},
}

const reviews = (state = initialState, action) => {
  let entities
  switch (action.type) {
    case ACTIONS.GET_REVIEWS:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        myReviews: { ...entities.review },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default reviews
