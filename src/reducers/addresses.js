import { ACTIONS } from 'actions/addresses'

import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  addresses: {},
  isFetching: false,
  isFetched: false,
}

const addresses = (state = initialState, action) => {
  let address
  let addresses
  switch (action.type) {
    case ACTIONS.GET_MY_ADDRESSES:
      addresses = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        addresses: addresses,
      }
    case ACTIONS.GET_ADDRESS:
      const { entities } = normalize(action.res)
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...entities.address },
        products: { ...state.products, ...entities.product },
      }
    case ACTIONS.CREATE_ADDRESS:
      address = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...address },
      }
    case ACTIONS.UPDATE_ADDRESS:
      address = normalize(action.res).entities.address
      return {
        ...state,
        ...successDefaults,
        addresses: { ...state.addresses, ...address },
      }
    case ACTIONS.DELETE_ADDRESS:
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

export default addresses
