import { buildList } from 'helpers/build'

export const selectUserCampaigns = state =>
  buildList(state.adminUserCampaigns, 'userCampaign', ['user', 'campaign'])

export const selectUserCampaign = (state, id) => state.adminUserCampaigns.userCampaigns[id]
