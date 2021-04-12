import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  GET_REVIEWS: 'GET_REVIEWS',
}

export const getReviews = () => {
  const apiRequest = api.get.bind(null, '/api/v1/app/reviews')
  return dispatchAction(ACTIONS.GET_REVIEWS, apiRequest)
}
