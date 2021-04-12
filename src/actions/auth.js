import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  AUTHENTICATE_FROM_TOKEN: 'AUTHENTICATE_FROM_TOKEN',
  CURRENT_USER_FETCH: 'CURRENT_USER_FETCH',
  CURRENT_USER_UPDATE: 'CURRENT_USER_UPDATE',
  LOGIN_USER: 'LOGIN_USER',
  SIGNUP_USER: 'SIGNUP_USER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
  LOGOUT_USER: 'LOGOUT_USER',
}

export const fetchMe = () => {
  // make sure the request is made and not retreieved from cache, even when hitting the back button
  const apiRequest = api.get.bind(null, `/api/v1/app/users/me?i=${Math.random()}`)
  return dispatchAction(ACTIONS.CURRENT_USER_FETCH, apiRequest)
}

export const updateUser = user => {
  const apiRequest = api.put.bind(null, `/api/v1/app/users/${user.id}`, { user })
  return dispatchAction(ACTIONS.CURRENT_USER_UPDATE, apiRequest)
}

export const loginUser = (email, password) => {
  const apiRequest = api.post.bind(null, '/api/v1/login', { email, password })
  return dispatchAction(ACTIONS.LOGIN_USER, apiRequest)
}

export const signupUser = user => {
  const apiRequest = api.post.bind(null, '/api/v1/signup', { user })
  return dispatchAction(ACTIONS.SIGNUP_USER, apiRequest)
}

export const resetPassword = (password, resetPasswordToken) => {
  const apiRequest = api.post.bind(null, '/api/v1/reset_password', {
    password,
    change_password_token: resetPasswordToken,
  })
  return dispatchAction(ACTIONS.RESET_PASSWORD, apiRequest)
}

export const forgotPassword = email => {
  const apiRequest = api.post.bind(null, '/api/v1/forgot_password', { email })
  return dispatchAction(ACTIONS.FORGOT_PASSWORD, apiRequest)
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('authToken')
  dispatch({ type: ACTIONS.LOGOUT_USER })
}

export const authenticateFromToken = token => dispatch => {
  localStorage.setItem('authToken', token)
  dispatch({
    type: ACTIONS.AUTHENTICATE_FROM_TOKEN,
    authToken: token,
  })
}
