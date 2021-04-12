import { ACTIONS } from 'actions/admin/messages'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  messages: {},
  users: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminMessages = (state = initialState, action) => {
  let messages
  switch (action.type) {
    case ACTIONS.ADMIN_GET_MESSAGES:
      messages = normalize(action.res).entities.textMessage
      console.log(messages)
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        messages,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminMessages
