import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  GET_PUBLIC_USER: 'GET_PUBLIC_USER',
  CREATE_REVIEW: 'CREATE_REVIEW',
  UPDATE_REVIEW: 'UPDATE_REVIEW',
  SET_REVIEWS_USER: 'SET_REVIEWS_USER',
}

export const getUser = id => {
  const apiRequest = api.get.bind(null, `/api/v1/public/users/${id}`)
  return dispatchAction(ACTIONS.GET_PUBLIC_USER, apiRequest)
}

export const createReview = (product, review) => {
  const reviewObject = { ...review, productId: product.id }
  const apiRequest = api.post.bind(null, `/api/v1/public/reviews`, { review: reviewObject })
  return dispatchAction(ACTIONS.CREATE_REVIEW, apiRequest)
}

export const updateReview = (product, review) => {
  const reviewObject = { ...review, productId: product.id, images_attributes: review.images }
  const apiRequest = api.put.bind(null, `/api/v1/public/reviews/${review.id}`, {
    review: reviewObject,
  })
  return dispatchAction(ACTIONS.UPDATE_REVIEW, apiRequest)
}

export const setReviewsUser = (reviews, reviewer) => {
  const apiRequest = api.post.bind(null, `/api/v1/public/reviews/set_user`, {
    reviews,
    reviewer,
  })
  return dispatchAction(ACTIONS.SET_REVIEWS_USER, apiRequest)
}
