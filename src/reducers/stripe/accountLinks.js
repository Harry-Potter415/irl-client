import { ACTIONS } from 'actions/stripe/accountLinks'

import { handleDefault, successDefaults } from 'helpers/redux-helper'

const initialState = {
  stripeAccountLink: null,
}

const stripeAccountLinks = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_STRIPE_ACCOUNT_LINK:
      const url = action.res.account_link
      return {
        ...state,
        ...successDefaults,
        stripeAccountLink: url,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default stripeAccountLinks
