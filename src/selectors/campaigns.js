import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectCampaigns = state => selectList(state.campaigns, 'campaigns')

export const selectMyCampaigns = state => {
  const { campaigns } = state
  return {
    myCampaigns: Object.values(campaigns.myCampaigns || {}),
    myTotal: campaigns.myTotal,
    myPage: campaigns.myPage,
    isFetched: campaigns.isFetched,
  }
}
export const selectAvailableCampaigns = state => {
  const { campaigns } = state
  return {
    availableCampaigns: Object.values(campaigns.availableCampaigns || {}),
    availableTotal: campaigns.availableTotal,
    availablePage: campaigns.availablePage,
    availableFetched: campaigns.availableFetched,
  }
}

export const selectCampaign = (state, id, from) => {
  return build(state.campaigns, id, 'campaign', ['products', 'user'], from)
}

export const selectCampaignAnalytics = (state, id, from) => {
  return build(state.campaigns, id, 'campaignAnalytics')
}
