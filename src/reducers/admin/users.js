import { ACTIONS } from 'actions/admin/users'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  users: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminUsers = (state = initialState, action) => {
  let user
  let users
  switch (action.type) {
    case ACTIONS.ADMIN_GET_USERS:
      users = normalize(action.res).entities.user
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        users: users,
      }
    case ACTIONS.ADMIN_GET_USER:
      const { entities } = normalize(action.res)
      return {
        ...state,
        ...successDefaults,
        users: { ...state.users, ...entities.user },
      }
    case ACTIONS.ADMIN_UPDATE_USER:
      user = normalize(action.res).entities.user
      return {
        ...state,
        ...successDefaults,
        users: { ...state.users, ...user },
      }
    case ACTIONS.ADMIN_CREATE_USER:
      user = normalize(action.res).entities.user
      return {
        ...state,
        ...successDefaults,
        users: { ...state.users, ...user },
      }
    case ACTIONS.ADMIN_DELETE_USER:
      users = { ...state.users }
      delete users[action.meta.id]
      return {
        ...state,
        ...successDefaults,
        users: users,
      }
    case ACTIONS.ADMIN_APPROVE_USERS:
      users = normalize(action.res).entities.user
      return {
        ...state,
        ...successDefaults,
        users: { ...state.users, ...users },
      }
    case ACTIONS.ADMIN_REJECT_USERS:
      users = normalize(action.res).entities.user
      return {
        ...state,
        ...successDefaults,
        users: { ...state.users, ...users },
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminUsers
