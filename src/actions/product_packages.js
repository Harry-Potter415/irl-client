import api from 'api'
import { dispatchAction } from 'helpers/redux-helper'

export const ACTIONS = {
  CREATE_PRODUCT_PACKAGE: 'CREATE_PRODUCT_PACKAGE',
}

export const createProductPackage = product => {
  const apiRequest = api.post.bind(null, '/api/v1/app/product_packages', { product })
  return dispatchAction(ACTIONS.CREATE_PRODUCT_PACKAGE, apiRequest)
}
