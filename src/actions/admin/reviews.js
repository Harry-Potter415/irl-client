import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_REVIEWS: 'ADMIN_GET_REVIEWS',
  ADMIN_GET_CAMPAIGN_REVIEWS: 'ADMIN_GET_CAMPAIGN_REVIEWS',
  ADMIN_GET_REVIEW: 'ADMIN_GET_REVIEW',
  APPROVE_REVIEWS: 'APPROVE_REVIEWS',
  REJECT_REVIEWS: 'REJECT_REVIEWS',
  CHANGE_REVIEW: 'CHANGE_REVIEW',
  APPROVE_REVIEW_IMAGES: 'APPROVE_REVIEW_IMAGES',
  REJECT_REVIEW_IMAGES: 'REJECT_REVIEW_IMAGES',
}

const _getReviews = (filters, page, url) => {
  if (filters.nameOrEmail) url = appendQuery(url, `name_or_email=${filters.nameOrEmail}`)
  if (filters.comment) url = appendQuery(url, `comment=${filters.comment}`)
  if (filters.ratingGt) url = appendQuery(url, `rating_gt=${filters.ratingGt}`)
  if (filters.reviewCampaignId)
    url = appendQuery(url, `review_campaign_id=${filters.reviewCampaignId}`)
  if (filters.reviewProductId)
    url = appendQuery(url, `review_product_id=${filters.reviewProductId}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_REVIEWS, apiRequest, { page })
}

export const getReviews = (campaignId, filters, page) => {
  let url = `/api/v1/admin/reviews`
  return _getReviews(filters, page, url)
}

export const getCampaignReviews = (campaignId, filters, page) => {
  let url = `/api/v1/admin/campaigns/${campaignId}/reviews`
  return _getReviews(filters, page, url)
}

export const getProductReviews = (productId, filters, page) => {
  let url = `/api/v1/admin/products/${productId}/reviews`
  return _getReviews(filters, page, url)
}

export const getReview = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/reviews/${id}`)
  return dispatchAction(ACTIONS.ADMIN_GET_REVIEW, apiRequest)
}

export const approveReviews = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/reviews/accept', { review_ids: ids })
  return dispatchAction(ACTIONS.APPROVE_REVIEWS, apiRequest)
}

export const rejectReviews = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/reviews/reject', { review_ids: ids })
  return dispatchAction(ACTIONS.REJECT_REVIEWS, apiRequest)
}

export const approveImages = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/images/accept', { image_ids: ids })
  return dispatchAction(ACTIONS.APPROVE_REVIEW_IMAGES, apiRequest)
}

export const rejectImages = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/images/reject', { image_ids: ids })
  return dispatchAction(ACTIONS.REJECT_REVIEW_IMAGES, apiRequest)
}
