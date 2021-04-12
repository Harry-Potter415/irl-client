import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { round } from 'lodash'
import { selectMyHosts } from 'selectors/hosts'
import { selectMyCampaigns } from 'selectors/campaigns'
import { selectMyUserCampaigns } from 'selectors/userCampaigns'

const DashboardBox = styled.div`
  padding: 20px 10px 20px 10px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  justify-content: center;
  display: flex;
  width: 80%;
  box-shadow: 4px 4px 7px -7px rgba(0, 0, 0, 0.75);
  flex-direction: column;
  align-items: center;
`

const SummaryBoxes = ({
  propertyCount,
  roomCount,
  unitsDistributedCount,
  totalOffered,
  unitsDistributedPercent,
}) => {
  return (
    <Fragment>
      <Grid item xs={3}>
        <DashboardBox>
          <Typography variant="h5">{propertyCount}</Typography>
          <Typography variant="h5">
            <b>Properties</b>
          </Typography>
        </DashboardBox>
      </Grid>
      <Grid item xs={3}>
        <DashboardBox>
          <Typography variant="h5">{roomCount}</Typography>
          <Typography variant="h5">
            <b>Rooms</b>
          </Typography>
        </DashboardBox>
      </Grid>
      <Grid item xs={3}>
        <DashboardBox>
          <Typography variant="h5">{unitsDistributedCount}</Typography>
          <Typography variant="h5">
            <b>Units Distributed</b>
          </Typography>
        </DashboardBox>
      </Grid>
      <Grid item xs={3}>
        <DashboardBox>
          <Typography variant="h5">{unitsDistributedPercent}%</Typography>
          <Typography variant="h5">
            <b>Units Distributed</b>
          </Typography>
        </DashboardBox>
      </Grid>
    </Fragment>
  )
}

const mapStateToProps = state => {
  const { myHosts } = selectMyHosts(state)
  const { myCampaigns } = selectMyCampaigns(state)
  const { myUserCampaigns } = selectMyUserCampaigns(state)

  const totalOffered = myCampaigns.reduce((count, campaign) => {
    return count + campaign.quantity
  }, 0)

  const roomCount = myHosts.reduce((count, host) => {
    return count + host.totalRooms
  }, 0)

  const myHostIds = myHosts.map(host => host.id)

  const unitsDistributedCount = myUserCampaigns.reduce((count, userCampaign) => {
    const userCampaignUserId = parseInt(userCampaign.user.id)
    if (userCampaign.status === 'delivered' && myHostIds.includes(userCampaignUserId))
      return count + userCampaign.quantity
    return count
  }, 0)

  const unitsDistributedPercent = round((unitsDistributedCount / (totalOffered || 1)) * 100, 2)

  return {
    propertyCount: myHosts.length,
    roomCount,
    unitsDistributedCount,
    unitsDistributedPercent,
    totalOffered,
  }
}

export default connect(mapStateToProps)(SummaryBoxes)
