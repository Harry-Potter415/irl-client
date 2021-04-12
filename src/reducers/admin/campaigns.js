import { ACTIONS } from 'actions/admin/campaigns'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  campaigns: {},
  campaignAnalytics: {},
  users: {},
  products: {},
  warehouseAddresses: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminCampaigns = (state = initialState, action) => {
  let campaign
  let campaigns
  let images
  switch (action.type) {
    case ACTIONS.ADMIN_GET_CAMPAIGNS:
      campaigns = normalize(action.res).entities.campaign

      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        campaigns: campaigns,
      }
    case ACTIONS.ADMIN_GET_CAMPAIGN:
      const { entities } = normalize(action.res)
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...entities.campaign },
        users: { ...state.users, ...entities.user },
        products: { ...state.products, ...entities.product },
        images: { ...state.images, ...entities.image },
        warehouseAddresses: { ...state.warehouseAddresses, ...entities.address },
      }
    case ACTIONS.ADMIN_UPDATE_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.ADMIN_CREATE_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.ADMIN_DELETE_CAMPAIGN:
      campaigns = { ...state.campaigns }
      delete campaigns[action.meta.id]
      return {
        ...state,
        ...successDefaults,
        campaigns: campaigns,
      }
    case ACTIONS.ADMIN_APPROVE_CAMPAIGNS:
      campaigns = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaigns },
      }
    case ACTIONS.ADMIN_REJECT_CAMPAIGNS:
      campaigns = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaigns },
      }
    case ACTIONS.APPROVE_CAMPAIGN_IMAGES:
      images = normalize(action.res).entities.image
      return {
        ...state,
        ...successDefaults,
        images: { ...state.images, ...images },
      }
    case ACTIONS.REJECT_CAMPAIGN_IMAGES:
      images = normalize(action.res).entities.image
      return {
        ...state,
        ...successDefaults,
        images: { ...state.images, ...images },
      }
    case ACTIONS.ADMIN_GET_CAMPAIGN_ANALYTICS:
      const { campaignAnalytics } = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        campaignAnalytics: { ...state.campaignAnalytics, ...campaignAnalytics },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminCampaigns
