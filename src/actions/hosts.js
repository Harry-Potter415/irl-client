import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  GET_MY_HOSTS: 'GET_MY_HOSTS',
  SELECT_HOST: 'SELECT_HOST',
}

export const getMyHosts = () => {
  const apiRequest = api.get.bind(null, '/api/v1/app/users/me/hosts')
  return dispatchAction(ACTIONS.GET_MY_HOSTS, apiRequest)
}

export const selectHost = hostId => {
  const dispatchAction = (actionName, hostId) => dispatch => {
    return dispatch({ type: actionName, res: {}, meta: hostId })
  }
  return dispatchAction(ACTIONS.SELECT_HOST, hostId)
}
