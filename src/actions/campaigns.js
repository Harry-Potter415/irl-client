import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'

export const ACTIONS = {
  GET_MY_CAMPAIGNS: 'GET_MY_CAMPAIGNS',
  GET_AVAILABLE_CAMPAIGNS: 'GET_AVAILABLE_CAMPAIGNS',
  GET_CAMPAIGN: 'GET_CAMPAIGN',
  BRAND_CREATE_CAMPAIGN: 'BRAND_CREATE_CAMPAIGN',
  BRAND_UPDATE_CAMPAIGN: 'BRAND_UPDATE_CAMPAIGN',
  BRAND_DELETE_CAMPAIGN: 'BRAND_DELETE_CAMPAIGN',
  APPLY_TO_CAMPAIGN: 'APPLY_TO_CAMPAIGN',
  DELIVER_USER_CAMPAIGN: 'DELIVER_USER_CAMPAIGN',
  UPLOAD_CAMPAIGN_IMAGES: 'UPLOAD_CAMPAIGN_IMAGES',
  GET_CAMPAIGN_ANALYTICS: 'GET_CAMPAIGN_ANALYTICS',
}

export const getMyCampaigns = page => {
  const apiRequest = api.get.bind(null, paginate('/api/v1/app/campaigns/my_campaigns', page))
  return dispatchAction(ACTIONS.GET_MY_CAMPAIGNS, apiRequest, { page })
}

export const getAvailableCampaigns = page => {
  const apiRequest = api.get.bind(null, paginate('/api/v1/app/campaigns', page))
  return dispatchAction(ACTIONS.GET_AVAILABLE_CAMPAIGNS, apiRequest, { page })
}

export const getCampaign = id => {
  const apiRequest = api.get.bind(null, `/api/v1/app/campaigns/${id}`)
  return dispatchAction(ACTIONS.GET_CAMPAIGN, apiRequest)
}

export const updateCampaign = campaign => {
  const apiRequest = api.put.bind(null, `/api/v1/app/campaigns/${campaign.id}`, { campaign })
  return dispatchAction(ACTIONS.BRAND_UPDATE_CAMPAIGN, apiRequest)
}

export const createCampaign = campaign => {
  const apiRequest = api.post.bind(null, '/api/v1/app/campaigns', { campaign })
  return dispatchAction(ACTIONS.BRAND_CREATE_CAMPAIGN, apiRequest)
}

export const deleteCampaign = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/app/campaigns/${id}`)
  return dispatchAction(ACTIONS.BRAND_DELETE_CAMPAIGN, apiRequest, { id })
}

export const applyToCampaign = (id, campaign) => {
  const apiRequest = api.post.bind(null, `/api/v1/app/campaigns/${id}/apply`, { campaign })
  return dispatchAction(ACTIONS.APPLY_TO_CAMPAIGN, apiRequest)
}

export const deliverUserCampaign = id => {
  const apiRequest = api.put.bind(null, `/api/v1/app/user_campaigns/${id}/deliver`)
  return dispatchAction(ACTIONS.DELIVER_USER_CAMPAIGN, apiRequest)
}

export const uploadCampaignImages = userCampaign => {
  const updateObject = { ...userCampaign, images_attributes: userCampaign.images }
  const apiRequest = api.put.bind(null, `/api/v1/app/user_campaigns/${userCampaign.id}/images`, {
    userCampaign: updateObject,
  })
  return dispatchAction(ACTIONS.UPLOAD_CAMPAIGN_IMAGES, apiRequest)
}

export const getCampaignAnalytics = id => {
  const apiRequest = api.get.bind(null, `/api/v1/app/campaigns/${id}/analytics`)
  return dispatchAction(ACTIONS.GET_CAMPAIGN_ANALYTICS, apiRequest)
}
