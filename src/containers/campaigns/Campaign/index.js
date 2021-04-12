import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, deleteCampaign } from 'actions/campaigns'
import { selectCampaign, selectCampaignAnalytics } from 'selectors/campaigns'
import { getCampaignAnalytics } from 'actions/campaigns'
import { selectCurrentUser } from 'selectors/auth'
import Campaign from 'components/campaigns/Campaign'
import { isAuthorized } from 'helpers/auth'

class CampaignContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: null,
      campaignAnalyticsLoaded: false,
    }
    this.loadCampaignAnalytics = this.loadCampaignAnalytics.bind(this)
  }

  componentDidMount() {
    const { getCampaign } = this.props
    const { id } = this.props.match.params
    getCampaign(id)
  }

  componentWillReceiveProps(newProps) {
    this.loadCampaignAnalytics()
  }

  loadCampaignAnalytics() {
    const { currentUser, getCampaignAnalytics } = this.props
    const { id } = this.props.match.params
    const { campaignAnalyticsLoaded } = this.state
    if (isAuthorized(currentUser, 'viewAnalytics', 'campaigns') && !campaignAnalyticsLoaded) {
      getCampaignAnalytics(id)
      this.setState({ campaignAnalyticsLoaded: true })
    }
  }

  deleteCampaign = () => {
    const { campaign, deleteCampaign, history, showAlertSuccess } = this.props
    deleteCampaign(campaign.id).then(() => {
      history.push('/placements')
      showAlertSuccess('Placement deleted successfully')
    })
  }

  render() {
    const { campaign, campaignAnalytics } = this.props
    return campaign ? (
      <Campaign
        campaign={campaign}
        deleteCampaign={this.deleteCampaign}
        campaignAnalytics={campaignAnalytics}
      />
    ) : null
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaign,
      deleteCampaign,
      getCampaignAnalytics,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const campaign = selectCampaign(state, id)
  const campaignAnalytics = selectCampaignAnalytics(state, id)
  const currentUser = selectCurrentUser(state)
  return {
    campaign,
    campaignAnalytics,
    currentUser,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(CampaignContainer)))
