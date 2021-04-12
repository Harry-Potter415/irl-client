import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'
import { paginate } from 'helpers/pagination'
import appendQuery from 'append-query'

export const ACTIONS = {
  ADMIN_GET_USERS: 'ADMIN_GET_USERS',
  ADMIN_GET_USER: 'ADMIN_GET_USER',
  ADMIN_UPDATE_USER: 'ADMIN_UPDATE_USER',
  ADMIN_CREATE_USER: 'ADMIN_CREATE_USER',
  ADMIN_DELETE_USER: 'ADMIN_DELETE_USER',
  ADMIN_APPROVE_USERS: 'ADMIN_APPROVE_USERS',
  ADMIN_REJECT_USERS: 'ADMIN_REJECT_USERS',
}

export const getUsers = (filters, page) => {
  let url = '/api/v1/admin/users'
  if (filters.name) url = appendQuery(url, `name=${filters.name}`)
  if (filters.email) url = appendQuery(url, `email=${filters.email}`)
  if (filters.company) url = appendQuery(url, `company=${filters.company}`)
  if (filters.userType) url = appendQuery(url, `user_type=${filters.userType}`)
  if (filters.rooms) url = appendQuery(url, `rooms=${filters.rooms}`)
  if (filters.city) url = appendQuery(url, `city=${filters.city}`)
  if (filters.audience) url = appendQuery(url, `audience=${filters.audience}`)
  if (filters.ageGroup) url = appendQuery(url, `age_group=${filters.ageGroup}`)
  const apiRequest = api.get.bind(null, paginate(url, page))
  return dispatchAction(ACTIONS.ADMIN_GET_USERS, apiRequest, { page })
}

export const getUser = id => {
  const apiRequest = api.get.bind(null, `/api/v1/admin/users/${id}`)
  return dispatchAction(ACTIONS.ADMIN_GET_USER, apiRequest)
}

export const updateUser = user => {
  const apiRequest = api.put.bind(null, `/api/v1/admin/users/${user.id}`, { user })
  return dispatchAction(ACTIONS.ADMIN_UPDATE_USER, apiRequest)
}

export const createUser = user => {
  const apiRequest = api.post.bind(null, '/api/v1/admin/users', { user })
  return dispatchAction(ACTIONS.ADMIN_CREATE_USER, apiRequest)
}

export const deleteUser = id => {
  const apiRequest = api.delete.bind(null, `/api/v1/admin/users/${id}`)
  return dispatchAction(ACTIONS.ADMIN_DELETE_USER, apiRequest, { id })
}

export const approveUsers = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/users/accept', { user_ids: ids })
  return dispatchAction(ACTIONS.ADMIN_APPROVE_USERS, apiRequest)
}

export const rejectUsers = ids => {
  const apiRequest = api.put.bind(null, '/api/v1/admin/users/reject', { user_ids: ids })
  return dispatchAction(ACTIONS.ADMIN_REJECT_USERS, apiRequest)
}
