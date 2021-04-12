import { ACTIONS } from 'actions/campaigns'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'
import { get } from 'lodash'

const initialState = {
  campaigns: {},
  products: {},
  users: {},
  campaignAnalytics: {},
  isFetching: false,
  isFetched: false,
  availableFetched: false,
}

const brandCampaigns = (state = initialState, action) => {
  let campaign
  let campaigns
  let entities
  switch (action.type) {
    case ACTIONS.GET_AVAILABLE_CAMPAIGNS:
      campaigns = normalize(action.res).entities.campaign
      return {
        ...state,
        availableTotal: parseInt(action.headers.total),
        availablePage: parseInt(action.headers.page),
        availableCampaigns: campaigns,
        availableFetched: true,
      }
    case ACTIONS.GET_MY_CAMPAIGNS:
      campaigns = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        myTotal: parseInt(action.headers.total),
        myPage: parseInt(action.headers.page),
        myCampaigns: campaigns,
      }

    case ACTIONS.GET_CAMPAIGN:
      entities = normalize(action.res).entities
      for (const id in entities.campaign) {
        entities.campaign[id].currentUserCampaign = get(
          entities.campaign[id],
          'currentUserCampaign.data.attributes'
        )
        if (get(entities.campaign[id], 'currentUserCampaign.order.data')) {
          entities.campaign[id].currentUserCampaign.order =
            entities.campaign[id].currentUserCampaign.order.data.attributes
        }
      }
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...entities.campaign },
        products: { ...state.products, ...entities.product },
        users: { ...state.users, ...entities.user },
      }
    case ACTIONS.BRAND_CREATE_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.BRAND_UPDATE_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.BRAND_DELETE_CAMPAIGN:
      campaigns = { ...state.campaigns }
      delete campaigns[action.meta.id]
      return {
        ...state,
        ...successDefaults,
        campaigns: campaigns,
      }
    case ACTIONS.APPLY_TO_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.DELIVER_USER_CAMPAIGN:
      campaign = normalize(action.res).entities.campaign
      return {
        ...state,
        ...successDefaults,
        campaigns: { ...state.campaigns, ...campaign },
      }
    case ACTIONS.UPLOAD_CAMPAIGN_IMAGES:
      return {
        ...state,
        ...successDefaults,
      }
    case ACTIONS.GET_CAMPAIGN_ANALYTICS:
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

export default brandCampaigns
