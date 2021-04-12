import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import Sync from 'react-select'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ReactSelect from 'components/inputs/ReactSelect'
import BarChart from 'components/dashboard/BarChart'
import SummaryBoxes from 'components/dashboard/SummaryBoxes'
import ReviewTable from 'components/dashboard/ReviewTable'
import AgeGroupBox from 'components/dashboard/AgeGroupBox'
import AudienceBox from 'components/dashboard/AudienceBox'
import { isMobile } from 'helpers/utils'
import { getMyHosts, selectHost } from 'actions/hosts'
import { getMyCampaigns } from 'actions/campaigns'
import { getMyUserCampaigns } from 'actions/userCampaigns'
import { buildUserCompanyOption } from 'helpers/react-select'
import { selectMyHosts } from 'selectors/hosts'
import { Button } from '@material-ui/core'

const MarginGrid = styled(Grid)`
  margin-bottom: ${props => props.bottom} !important;
  margin-top: ${props => props.top} !important;
  margin-right: ${props => props.right} !important;
`

const BrandDashboard = ({
  history,
  getMyHosts,
  getMyCampaigns,
  getMyUserCampaigns,
  users,
  selectHost,
}) => {
  const handleChange = hostSelected => {
    hostSelected && hostSelected.value ? selectHost(hostSelected.value) : getMyHosts()
  }

  useEffect(() => {
    getMyHosts()
    getMyCampaigns()
    getMyUserCampaigns()
  }, [getMyHosts, getMyCampaigns, getMyUserCampaigns])

  return (
    <Grid container>
      <MarginGrid bottom="30px" item xs={6}>
        <Typography variant="h4">Placement Overview</Typography>
      </MarginGrid>
      <MarginGrid bottom="30px" item xs={6}>
        <Grid container justify="flex-end">
          <MarginGrid item right="30px">
            <Button
              color="primary"
              variant="contained"
              size={isMobile() ? 'small' : 'medium'}
              onClick={() => history.push('/placements/new')}
            >
              New Placement
            </Button>
          </MarginGrid>
        </Grid>
      </MarginGrid>
      <MarginGrid bottom="15px" item xs={12}>
        <Typography variant="h5">My Placements:</Typography>
      </MarginGrid>
      <MarginGrid bottom="30px" item xs={4}>
        <Typography variant="body1">View Your Property Data</Typography>
        <ReactSelect
          handleChange={handleChange}
          hasValue
          name="host"
          options={[
            { value: null, label: 'All Properties' },
            ...users
              .map(user => buildUserCompanyOption(user))
              .filter(option => option && option.label),
          ]}
          SelectComponent={Sync}
          placeholder="All Properties"
          label=""
        />
      </MarginGrid>
      <MarginGrid bottom="40px" container>
        <SummaryBoxes />
      </MarginGrid>
      <Grid container justify-content="space-around" spacing={5}>
        <Grid item xs={4}>
          <BarChart />
        </Grid>
        <Grid item xs={4}>
          <AudienceBox />
        </Grid>
        <Grid item xs={4}>
          <AgeGroupBox />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ReviewTable showOnlyFirstPage />
          <MarginGrid top="20px" container justify="center" alignItems="center">
            <Button
              color="primary"
              variant="contained"
              size={isMobile() ? 'small' : 'medium'}
              onClick={() => history.push('/dashboard/reviews')}
            >
              View All Reviews
            </Button>
          </MarginGrid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMyHosts,
      getMyCampaigns,
      getMyUserCampaigns,
      selectHost,
    },
    dispatch
  )
}

const mapStateToProps = state => {
  const { myHosts } = selectMyHosts(state)
  return {
    users: myHosts,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BrandDashboard))
