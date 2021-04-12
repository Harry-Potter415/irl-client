import { ACTIONS } from 'actions/stripe/accounts'
import normalize from 'jsonapi-normalizer'
import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  stripeAccount: null,
}

const stripeAccounts = (state = initialState, action) => {
  let stripeAccount
  switch (action.type) {
    case ACTIONS.CREATE_STRIPE_ACCOUNT:
      if (!state.user) return state
      const id = action.res.account
      return {
        ...state,
        ...successDefaults,
        user: { ...state.user, attributes: { ...state.user.attributes, stripeAccount: id } },
      }
    case ACTIONS.GET_STRIPE_ACCOUNT:
      stripeAccount = normalize(action.res).entities.account
      return {
        ...state,
        ...successDefaults,
        stripeAccount,
      }
    case ACTIONS.UPDATE_STRIPE_ACCOUNT:
      stripeAccount = normalize(action.res).entities.account
      return {
        ...state,
        ...successDefaults,
        stripeAccount,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default stripeAccounts
