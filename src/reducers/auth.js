import _ from 'lodash'
import { ACTIONS } from 'actions/auth'
import { handleDefault, successDefaults, failure } from 'helpers/redux-helper'

const initialState = {
  authToken: null,
  currentCheckout: null,
  currentUser: null,
  isFetching: false,
  isFetched: false,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.AUTHENTICATE_FROM_TOKEN:
      return {
        ...state,
        ...successDefaults,
        authenticated: true,
        authToken: action.authToken,
      }
    case failure(ACTIONS.LOGIN_USER):
    case failure(ACTIONS.SIGNUP_USER):
    case failure(ACTIONS.RESET_PASSWORD):
    case failure(ACTIONS.FORGOT_PASSWORD):
      return {
        ...state,
        authenticated: false,
        isFetching: false,
        isFetched: false,
        error: action.error,
      }
    case ACTIONS.CURRENT_USER_FETCH:
      return {
        ...state,
        ...successDefaults,
        currentUser: _.get(action, ['res', 'data']),
        currentCheckout: _.get(action, ['res', 'meta', 'current_checkout']),
      }
    case ACTIONS.CURRENT_USER_UPDATE:
      return {
        ...state,
        ...successDefaults,
        user: action.res.data,
      }
    case ACTIONS.LOGIN_USER:
      return {
        ...state,
        ...successDefaults,
        authToken: action.res.meta.token,
        currentUser: action.res.data,
        currentCheckout: _.get(action, ['res', 'meta', 'current_checkout']),
        authenticated: true,
      }
    case ACTIONS.SIGNUP_USER:
      return {
        ...state,
        ...successDefaults,
        authToken: action.res.meta.token,
        currentUser: action.res.data,
        currentCheckout: _.get(action, ['res', 'meta', 'current_checkout']),
        authenticated: true,
      }
    case ACTIONS.FORGOT_PASSWORD:
      return {
        ...state,
        ...successDefaults,
      }
    case ACTIONS.RESET_PASSWORD:
      return {
        ...state,
        ...successDefaults,
      }
    case ACTIONS.LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        authenticated: false,
        isFetching: false,
        isFetched: false,
        error: null,
      }
    default:
      return handleDefault(state, action, ACTIONS)
  }
}

export default auth
