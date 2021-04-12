import api from 'api'
import { get } from 'lodash'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import { fetchProduct } from 'shopjs/services/Shopify/buy'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_CAMPAIGNS: 'ADMIN_GET_CAMPAIGNS',
  ADMIN_GET_CAMPAIGN: 'ADMIN_GET_CAMPAIGN',
  ADMIN_UPDATE_CAMPAIGN: 'ADMIN_UPDATE_CAMPAIGN',
  ADMIN_CREATE_CAMPAIGN: 'ADMIN_CREATE_CAMPAIGN',
  ADMIN_DELETE_CAMPAIGN: 'ADMIN_DELETE_CAMPAIGN',
  ADMIN_APPROVE_CAMPAIGNS: 'ADMIN_APPROVE_CAMPAIGNS',
  ADMIN_REJECT_CAMPAIGNS: 'ADMIN_REJECT_CAMPAIGNS',
  APPROVE_CAMPAIGN_IMAGES: 'APPROVE_CAMPAIGN_IMAGES',
  REJECT_CAMPAIGN_IMAGES: 'REJECT_CAMPAIGN_IMAGES',
  ADMIN_GET_CAMPAIGN_ANALYTICS: 'ADMIN_GET_CAMPAIGN_ANALYTICS',
}

export const getCampaigns = (filters, page) => {
  let url = '/api/v1/admin/campaigns'
  if (filters.id) url = appendQuery(url, `id=${filters.id}`)
  if (filters.title) url = appendQuery(url, `title=${filters.title}`)
  if (filters.startDate) url = appendQuery(url, `start_date=${filters.startDate}`)
  if (filters.endDate) url = appendQuery(url, `end_date=${filters.endDate}`)
  if (filters.status) url = appendQuery(url, `status=${filters.status}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_CAMPAIGNS, apiRequest, { page })
}

// helper - fetch data from both rails and (if needed) shopify
const fetchAllCampaignData = id => async () => {
  const response = await api.get(`/api/v1/admin/campaigns/${id}`)
  const campaign = get(response, 'data.data.attributes')
  // inject any associated shopify data:
  if (campaign && campaign.shopifyId && campaign.shopifyHandle) {
    response.data.data.attributes.shopifyProduct = await fetchProduct(campaign.shopifyHandle)
  }
  if (campaign && campaign.shopifyShopId && campaign.shopifyShopHandle) {
    response.data.data.attributes.shopifyShopProduct = await fetchProduct(
      campaign.shopifyShopHandle
    )
  }
  return response
}

export const getCampaign = id =>
  dispatchAction(ACTIONS.ADMIN_GET_CAMPAIGN, fetchAllCampaignData(id))

export const updateCampaign = campaign => {
  const apiRequest = api.put.bind(null, `/api/v1/admin/campaigns/${campaign.id}`, { campaign })
  return dispatchAction(ACTIONS.ADMIN_UPDATE_CAMPAIGN, apiRequest)
}

export const createCampaign = campaign => {
  const apiRequest = api.post.bind(null, '/api/v1/admin/campaigns', { campaign })
  return dispatchAction(ACTIONS.ADMIN_CREATE_CAMPAIGN, apiRequest)
}

export const deleteCampaign = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/admin/campaigns/${id}`)
  return dispatchAction(ACTIONS.ADMIN_DELETE_CAMPAIGN, apiRequest, { id })
}

export const approveCampaigns = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/campaigns/accept', { campaign_ids: ids })
  return dispatchAction(ACTIONS.ADMIN_APPROVE_CAMPAIGNS, apiRequest)
}

export const rejectCampaigns = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/campaigns/reject', { campaign_ids: ids })
  return dispatchAction(ACTIONS.ADMIN_REJECT_CAMPAIGNS, apiRequest)
}

export const approveCampaignImages = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/images/accept', { image_ids: ids })
  return dispatchAction(ACTIONS.APPROVE_CAMPAIGN_IMAGES, apiRequest)
}

export const rejectCampaignImages = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/images/reject', { image_ids: ids })
  return dispatchAction(ACTIONS.REJECT_CAMPAIGN_IMAGES, apiRequest)
}

export const getCampaignAnalytics = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/campaigns/${id}/analytics`)
  return dispatchAction(ACTIONS.ADMIN_GET_CAMPAIGN_ANALYTICS, apiRequest)
}
