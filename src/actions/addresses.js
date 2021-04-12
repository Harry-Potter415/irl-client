import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  GET_MY_ADDRESSES: 'GET_MY_ADDRESSES',
  GET_ADDRESS: 'GET_ADDRESS',
  CREATE_ADDRESS: 'CREATE_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
}

export const getMyAddresses = () => {
  const apiRequest = api.get.bind(null, '/api/v1/app/addresses')
  return dispatchAction(ACTIONS.GET_MY_ADDRESSES, apiRequest)
}

export const getAddress = id => {
  const apiRequest = api.get.bind(null, `/api/v1/app/addresses/${id}`)
  return dispatchAction(ACTIONS.GET_ADDRESS, apiRequest)
}

export const updateAddress = address => {
  const apiRequest = api.put.bind(null, `/api/v1/app/addresses/${address.id}`, { address })
  return dispatchAction(ACTIONS.UPDATE_ADDRESS, apiRequest)
}

export const createAddress = address => {
  const apiRequest = api.post.bind(null, '/api/v1/app/addresses', { address })
  return dispatchAction(ACTIONS.CREATE_ADDRESS, apiRequest)
}

export const deleteAddress = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/app/addresses/${id}`)
  return dispatchAction(ACTIONS.DELETE_ADDRESS, apiRequest, { id })
}
