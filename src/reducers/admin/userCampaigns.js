import { ACTIONS } from 'actions/admin/userCampaigns'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'
import { get } from 'lodash'

const initialState = {
  userCampaigns: {},
  users: {},
  campaigns: {},
  orders: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminUserCampaigns = (state = initialState, action) => {
  let userCampaigns
  let entities
  switch (action.type) {
    case ACTIONS.ADMIN_GET_USER_CAMPAIGNS:
      entities = normalize(action.res).entities
      for (const id in entities.userCampaign) {
        const userCampaign = entities.userCampaign[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }

      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        userCampaigns: entities.userCampaign,
        users: entities.user,
        campaigns: entities.campaign,
      }
    case ACTIONS.ADMIN_GET_USER_CAMPAIGN:
      entities = normalize(action.res).entities
      for (const id in entities.userCampaign) {
        const userCampaign = entities.userCampaign[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }

      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        userCampaigns: entities.userCampaign,
        users: entities.user,
        campaigns: entities.campaign,
        orders: entities.order,
      }
    case ACTIONS.ADMIN_GET_ALL_USER_CAMPAIGNS:
      entities = normalize(action.res).entities
      for (const id in entities.userCampaign) {
        const userCampaign = entities.userCampaign[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        userCampaigns: entities.userCampaign,
        users: entities.user,
        campaigns: entities.campaign,
        orders: { ...state.orders, ...entities.order },
      }
    case ACTIONS.APPROVE_USER_CAMPAIGNS:
      userCampaigns = normalize(action.res).entities.userCampaign

      for (const id in userCampaigns) {
        const userCampaign = userCampaigns[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }

      return {
        ...state,
        ...successDefaults,
        userCampaigns: { ...state.userCampaigns, ...userCampaigns },
      }
    case ACTIONS.REJECT_USER_CAMPAIGNS:
      userCampaigns = normalize(action.res).entities.userCampaign

      for (const id in userCampaigns) {
        const userCampaign = userCampaigns[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }

      return {
        ...state,
        ...successDefaults,
        userCampaigns: { ...state.userCampaigns, ...userCampaigns },
      }
    case ACTIONS.ADMIN_UPDATE_USER_CAMPAIGN:
      userCampaigns = normalize(action.res).entities.userCampaign

      for (const id in userCampaigns) {
        const userCampaign = userCampaigns[id]
        userCampaign.order = get(userCampaign, 'order.data.attributes')
      }

      return {
        ...state,
        ...successDefaults,
        userCampaigns: { ...state.userCampaigns, ...userCampaigns },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminUserCampaigns
