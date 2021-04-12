import { get } from 'lodash'
import { formatPrice } from 'helpers/orders'
import { ORDER_TYPES } from 'lib/constants'

export const lineItemPrice = lineItem => {
  return lineItem.type === ORDER_TYPES.placement
    ? '-'
    : formatPrice(get(lineItem, 'node.variant.priceV2'))
}

export const lineItemStatus = lineItem => {
  return lineItem.type === ORDER_TYPES.placement ? lineItem.userCampaign.status : null
}

export const lineItemQuantity = lineItem => {
  return lineItem.type === ORDER_TYPES.placement
    ? get(lineItem, 'userCampaign.quantity')
    : get(lineItem, 'node.quantity')
}
