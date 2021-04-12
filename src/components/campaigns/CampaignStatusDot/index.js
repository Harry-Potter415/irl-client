import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCurrentUser } from 'selectors/auth'
import moment from 'moment'
import styled from 'styled-components'

class CampaignStatusDot extends Component {
  getDotColor(campaign) {
    switch (campaign.status) {
      case 'pending':
        return 'yellow'
      case 'accepted':
        if (moment().isAfter(campaign.startDate)) {
          return '#42B662'
        } else {
          return 'lightgreen'
        }
      case 'rejected':
        return '#F05A8D'
      default:
        return null
    }
  }

  render() {
    const { campaign, currentUser } = this.props
    const status = this.getDotColor(campaign)
    const campaignStatusText = `Campaign is ${campaign.status}.`
    const Dot = styled.span`
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      vertical-align: top;
      margin: 0 10px;
      background: ${status};
    `

    return currentUser.attributes.userType === 'brand' ? <Dot title={campaignStatusText} /> : null
  }
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(CampaignStatusDot)
