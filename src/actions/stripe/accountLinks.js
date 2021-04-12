import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  CREATE_STRIPE_ACCOUNT_LINK: 'CREATE_STRIPE_ACCOUNT_LINK',
}

export const createStripeAccountLink = () => {
  const apiRequest = api.post.bind(null, '/api/v1/app/stripe/account_links')
  return dispatchAction(ACTIONS.CREATE_STRIPE_ACCOUNT_LINK, apiRequest)
}
