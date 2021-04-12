import { build, buildList } from 'helpers/build'

export const selectOrders = state => buildList(state.orders, 'orders', ['userCampaigns'])

export const selectOrder = (state, id) => {
  return build(state.orders, id, 'order', ['userCampaigns'])
}
