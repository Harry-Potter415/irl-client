import { ORDER_TYPES } from 'lib/constants'
import { get } from 'lodash'

const placementLineItem = (userCampaign, order) => {
  const { lineItemId, shopifyId } = userCampaign
  // find by line item id or fall back to variant id for older orders
  return order.lineItems.edges.find(lineItem => {
    return get(lineItem, 'node.id') === lineItemId || get(lineItem, 'node.variant.id') === shopifyId
  })
}

const shopLineItems = (order, placementItems) => {
  const placementShopifyIds = placementItems.map(item => get(item, 'node.id'))
  return order.lineItems.edges.filter(
    lineItem => !placementShopifyIds.includes(get(lineItem, 'node.id'))
  )
}

export const buildOrderLineItems = order => {
  const placementItems = order.userCampaigns.map(userCampaign => {
    return { ...placementLineItem(userCampaign, order), type: ORDER_TYPES.placement, userCampaign }
  })
  const shopItems = shopLineItems(order, placementItems).map(lineItem => {
    return { ...lineItem, type: ORDER_TYPES.shop }
  })
  return [...placementItems, ...shopItems]
}
