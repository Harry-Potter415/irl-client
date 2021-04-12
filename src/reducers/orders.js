import { ACTIONS } from 'actions/orders'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  orders: {},
  userCampaigns: {},
}

const orders = (state = initialState, action) => {
  let entities
  switch (action.type) {
    case ACTIONS.CREATE_ORDER:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        orders: { ...state.orders, ...entities.order },
      }
    case ACTIONS.UPDATE_ORDER:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        orders: { ...state.orders, ...entities.order },
      }
    case ACTIONS.GET_ORDERS:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        orders: { ...entities.order },
        userCampaigns: { ...entities.userCampaign },
      }
    case ACTIONS.GET_ORDER:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        orders: { ...entities.order },
        userCampaigns: { ...entities.userCampaign },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default orders
