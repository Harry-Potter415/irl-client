import { ACTIONS } from 'actions/admin/addresses'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults, paginationDefaults } from 'helpers/redux-helper'

const initialState = {
  addresses: {},
  users: {},
  isFetching: false,
  isFetched: false,
  total: 0,
  page: 1,
}

const adminAddresses = (state = initialState, action) => {
  let address
  let addresses
  switch (action.type) {
    case ACTIONS.ADMIN_GET_ADDRESSES:
      addresses = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        ...paginationDefaults(action),
        addresses: addresses,
      }
    case ACTIONS.ADMIN_GET_ADDRESS:
      const { entities } = normalize(action.res)
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...entities.address },
        users: { ...state.users, ...entities.user },
      }
    case ACTIONS.ADMIN_UPDATE_ADDRESS:
      address = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...address },
      }
    case ACTIONS.ADMIN_CREATE_ADDRESS:
      address = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...address },
      }
    case ACTIONS.ADMIN_DELETE_ADDRESS:
      addresses = { ...state.addresses }
      delete addresses[action.meta.id]
      return {
        ...state,
        ...successDefaults,
        addresses: addresses,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default adminAddresses
