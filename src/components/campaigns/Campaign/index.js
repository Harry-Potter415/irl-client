import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import DetailsHeroCard from 'components/details/DetailsHeroCard'
import CampaignApply from 'components/campaignApply/CampaignApply'
import PropTypes from 'prop-types'
import DeleteButton from 'components/layout/DeleteButton'
import { isAuthorized } from 'helpers/auth'
import styled from 'styled-components'
import { selectCurrentUser } from 'selectors/auth'
import CampaignDetails from 'components/campaigns/CampaignDetails'
import CampaignImages from 'components/campaigns/CampaignImages'
import CampaignAnalytics from 'components/campaigns/CampaignAnalytics'
import { Tab } from '@material-ui/core'
import BaseTabs from 'components/layout/Tabs'
import { USER_TYPES } from 'lib/constants'
import CampaignStatusChiclet from '../CampaignStatusChiclet'

const TABS = {
  details: 0,
  analytics: 1,
  images: 2,
}

const TAB_COMPONENTS = {
  0: CampaignDetails,
  1: CampaignAnalytics,
  2: CampaignImages,
}

const Description = styled(Typography)`
  white-space: pre-wrap;
`
const Tabs = styled(BaseTabs)`
  @media (min-width: 600px) {
    position: absolute;
    bottom: -30px;
    max-width: 100%;
  }
  @media (min-width: 601px) and (max-width: 960px) {
    bottom: -58px;
  }
  @media (min-width: 600px) and (max-width: 1200px) {
    button {
      min-width: 33%;
    }
  }
  @media (max-width: 600px) {
    margin-top: 20px;
    margin-bottom: -20px;
  }
`

class Campaign extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: TABS.details,
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(e, tab) {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      campaign,
      campaign: { title, description },
      currentUser,
      deleteCampaign,
      campaignAnalytics,
    } = this.props
    const { activeTab } = this.state
    const isAdmin = currentUser ? currentUser.attributes.isAdmin : false
    const editUrl = isAdmin
      ? `/admin/placements/${campaign.id}/edit`
      : `/placements/${campaign.id}/edit`

    const deleteButton = <DeleteButton title={`Delete ${campaign.title}`} action={deleteCampaign} />
    const canEdit = isAuthorized(currentUser, 'edit', 'campaigns', campaign)
    const userType = currentUser && currentUser.attributes.userType

    const ActiveTab = TAB_COMPONENTS[activeTab]

    return (
      <Fragment>
        <CampaignStatusChiclet campaign={campaign} />
        <DetailsHeroCard
          editHref={editUrl}
          DeleteButton={deleteButton}
          canEdit={canEdit}
          images={[campaign.imageUrl]}
        >
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Description paragraph variant="body1">
            {description}
          </Description>
          {isAuthorized(currentUser, 'apply', 'campaigns') && <CampaignApply campaign={campaign} />}
          {userType === USER_TYPES.brand && (
            <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
              <Tab label="Details" />
              <Tab label="Analytics" />
              <Tab label="Photos" />
            </Tabs>
          )}
        </DetailsHeroCard>
        <ActiveTab campaign={campaign} campaignAnalytics={campaignAnalytics} />
      </Fragment>
    )
  }
}

Campaign.propTypes = {
  campaign: PropTypes.object,
  campaignAnalytics: PropTypes.object,
  deleteCampaign: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(Campaign)
