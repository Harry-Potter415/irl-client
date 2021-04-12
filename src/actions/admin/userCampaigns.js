import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_USER_CAMPAIGNS: 'ADMIN_GET_USER_CAMPAIGNS',
  ADMIN_GET_USER_CAMPAIGN: 'ADMIN_GET_USER_CAMPAIGN',
  ADMIN_GET_ALL_USER_CAMPAIGNS: 'ADMIN_GET_ALL_USER_CAMPAIGNS',
  APPROVE_USER_CAMPAIGNS: 'APPROVE_USER_CAMPAIGNS',
  REJECT_USER_CAMPAIGNS: 'REJECT_USER_CAMPAIGNS',
  ADMIN_UPDATE_USER_CAMPAIGN: 'ADMIN_UPDATE_USER_CAMPAIGN',
}

export const getUserCampaigns = (campaignId, page) => {
  const apiRequest = api.get.bind(
    null,
    paginate(`/api/v1/admin/campaigns/${campaignId}/user_campaigns`, page)
  )
  return dispatchAction(ACTIONS.ADMIN_GET_USER_CAMPAIGNS, apiRequest, { page })
}

export const getUserCampaign = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/user_campaigns/${id}`)
  return dispatchAction(ACTIONS.ADMIN_GET_USER_CAMPAIGN, apiRequest)
}

export const getAllUserCampaigns = (filters, page) => {
  let url = '/api/v1/admin/user_campaigns'
  if (filters.orderNumber) url = appendQuery(url, `order_number=${filters.orderNumber}`)
  if (filters.campaignId) url = appendQuery(url, `campaign_id=${filters.campaignId}`)
  if (filters.host) url = appendQuery(url, `host=${filters.host}`)
  if (filters.company) url = appendQuery(url, `company=${filters.company}`)
  if (filters.status) url = appendQuery(url, `status=${filters.status}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_ALL_USER_CAMPAIGNS, apiRequest, { page })
}

export const approveUserCampaigns = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/user_campaigns/accept', {
    user_campaign_ids: ids,
  })
  return dispatchAction(ACTIONS.APPROVE_USER_CAMPAIGNS, apiRequest)
}

export const rejectUserCampaigns = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/user_campaigns/reject', {
    user_campaign_ids: ids,
  })
  return dispatchAction(ACTIONS.REJECT_USER_CAMPAIGNS, apiRequest)
}

export const updateUserCampaign = (id, { status, quantity }) => {
  const apiRequest = api.put.bind(null, `/api/v1/admin/user_campaigns/${id}`, {
    status,
    quantity,
  })
  return dispatchAction(ACTIONS.ADMIN_UPDATE_USER_CAMPAIGN, apiRequest)
}
