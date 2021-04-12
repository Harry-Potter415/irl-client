import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, deleteCampaign } from 'actions/admin/campaigns'
import { selectCampaign, selectCampaignAnalytics } from 'selectors/admin/campaigns'
import Campaign from 'components/campaigns/Campaign'
import { getCampaignAnalytics } from 'actions/admin/campaigns'
import { selectCurrentUser } from 'selectors/auth'
import { isAuthorized } from 'helpers/auth'

class AdminViewCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: null,
      campaignAnalyticsLoaded: false,
    }
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
      history.push('/admin/campaigns')
      showAlertSuccess('Placement deleted successfully')
    })
  }

  render() {
    const { campaign, campaignAnalytics } = this.props

    return (
      <div>
        {campaign && (
          <Fragment>
            <Campaign
              campaign={campaign}
              deleteCampaign={this.deleteCampaign}
              campaignAnalytics={campaignAnalytics}
            />
          </Fragment>
        )}
      </div>
    )
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
)(withRouter(withAlerts(AdminViewCampaign)))
