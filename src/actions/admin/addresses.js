import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'

export const ACTIONS = {
  ADMIN_GET_ADDRESSES: 'ADMIN_GET_ADDRESSES',
  ADMIN_GET_ADDRESS: 'ADMIN_GET_ADDRESS',
  ADMIN_UPDATE_ADDRESS: 'ADMIN_UPDATE_ADDRESS',
  ADMIN_CREATE_ADDRESS: 'ADMIN_CREATE_ADDRESS',
  ADMIN_DELETE_ADDRESS: 'ADMIN_DELETE_ADDRESS',
}

export const getAddresses = page => {
  const apiRequest = api.get.bind(null, paginate('/api/v1/admin/addresses', page))
  return dispatchAction(ACTIONS.ADMIN_GET_ADDRESSES, apiRequest, { page })
}

export const getAddress = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/addresses/${id}`)
  return dispatchAction(ACTIONS.ADMIN_GET_ADDRESS, apiRequest)
}

export const updateAddress = address => {
  const updateObject = address
  const apiRequest = api.put.bind(null, `/api/v1/admin/addresses/${address.id}`, {
    address: updateObject,
  })
  return dispatchAction(ACTIONS.ADMIN_UPDATE_ADDRESS, apiRequest)
}

export const createAddress = address => {
  const updateObject = address
  const apiRequest = api.post.bind(null, '/api/v1/admin/addresses', { address: updateObject })
  return dispatchAction(ACTIONS.ADMIN_CREATE_ADDRESS, apiRequest)
}

export const deleteAddress = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/admin/addresses/${id}`)
  return dispatchAction(ACTIONS.ADMIN_DELETE_ADDRESS, apiRequest, { id })
}
