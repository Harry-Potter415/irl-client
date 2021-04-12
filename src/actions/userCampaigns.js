import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  GET_MY_USER_CAMPAIGNS: 'GET_MY_USER_CAMPAIGNS',
}

export const getMyUserCampaigns = (campaignId, page) => {
  const apiRequest = api.get.bind(null, '/api/v1/app/user_campaigns')
  return dispatchAction(ACTIONS.GET_MY_USER_CAMPAIGNS, apiRequest)
}
