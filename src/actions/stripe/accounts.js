import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  CREATE_STRIPE_ACCOUNT: 'CREATE_STRIPE_ACCOUNT',
  GET_STRIPE_ACCOUNT: 'GET_STRIPE_ACCOUNT',
  UPDATE_STRIPE_ACCOUNT: 'UPDATE_STRIPE_ACCOUNT',
}

export const createStripeAccount = () => {
  const apiRequest = api.post.bind(null, '/api/v1/app/stripe/accounts')
  return dispatchAction(ACTIONS.CREATE_STRIPE_ACCOUNT, apiRequest)
}

export const getStripeAccount = () => {
  const apiRequest = api.get.bind(null, '/api/v1/app/stripe/account')
  return dispatchAction(ACTIONS.GET_STRIPE_ACCOUNT, apiRequest)
}

export const updateStripeAccount = token => {
  const apiRequest = api.put.bind(null, '/api/v1/app/stripe/account', { token })
  return dispatchAction(ACTIONS.UPDATE_STRIPE_ACCOUNT, apiRequest)
}
