import { ACTIONS } from 'actions/hosts'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'
import { pick } from 'lodash'

const initialState = {
  hosts: {},
}

const hosts = (state = initialState, action) => {
  let entities
  switch (action.type) {
    case ACTIONS.GET_MY_HOSTS:
      entities = normalize(action.res).entities
      return {
        ...state,
        ...successDefaults,
        hosts: { ...entities.user },
      }
    case ACTIONS.SELECT_HOST:
      const hosts = pick(state.hosts, action.meta)
      return {
        ...state,
        hosts,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default hosts
