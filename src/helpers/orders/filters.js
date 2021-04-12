import { get } from 'lodash'

export const filterProductName = (value, lineItem) => {
  if (!value) return true
  const title = get(lineItem, 'node.title')
  const regExp = new RegExp(value, 'i')
  return title && title.search(regExp) >= 0
}

export const filterProductType = (value, lineItem) => {
  if (!value) return true
  const productType = get(lineItem, 'node.variant.product.productType')
  const regExp = new RegExp(value, 'i')
  return productType && productType.search(regExp) >= 0
}

export const filterStatus = (value, lineItem) => {
  if (!value) return true
  return lineItem.userCampaign && lineItem.userCampaign.status === value
}

export const filterOrderType = (value, lineItem) => {
  return lineItem.type === value
}
