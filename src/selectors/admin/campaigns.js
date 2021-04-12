import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectCampaigns = state => selectList(state.adminCampaigns, 'campaigns')

export const selectCampaign = (state, id) => {
  return build(state.adminCampaigns, id, 'campaign', [
    'user',
    'products',
    'warehouseAddress',
    'images',
  ])
}

export const selectCampaignAnalytics = (state, id, from) => {
  return build(state.adminCampaigns, id, 'campaignAnalytics')
}
