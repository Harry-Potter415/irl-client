export const selectMyUserCampaigns = state => {
  const { userCampaigns } = state
  return {
    myUserCampaigns: Object.values(userCampaigns.myUserCampaigns || {}),
  }
}
