import moment from 'moment'
import config from 'config'

export const campaignPeriod = (campaign, format) => {
  const dates = []
  if (campaign.startDate) {
    dates.push(moment(campaign.startDate).format(format || config.DATE_FORMAT))
  }
  if (campaign.endDate) {
    dates.push(moment(campaign.endDate).format(format || config.DATE_FORMAT))
  }
  return dates.join(' - ')
}
