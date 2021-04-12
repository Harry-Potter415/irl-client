import { ACTIONS } from 'actions/userCampaigns'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  myUserCampaigns: {},
}

const userCampaigns = (state = initialState, action) => {
  let entities
  switch (action.type) {
    case ACTIONS.GET_MY_USER_CAMPAIGNS:
      entities = normalize(action.res).entities

      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        myUserCampaigns: entities.userCampaign,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default userCampaigns
