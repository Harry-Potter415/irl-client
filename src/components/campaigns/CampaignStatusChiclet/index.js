import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCurrentUser } from 'selectors/auth'
import moment from 'moment'
import styled from 'styled-components'

import CampaignStatusDot from 'components/campaigns/CampaignStatusDot'

const Container = styled.div`
  position: absolute;
  top: 60px;
  right: 40px;
  display: inline-block;
  font-weight: 600;
  background: rgba(55, 46, 46, 0.75);
  padding: 10px;
  color: #ffffff;
  @media (max-width: 600px) {
    top: 150px;
    right: 10px;
  }
  @media (min-width: 601px) and (max-width: 960px) {
    top: 80px;
    right: 40px;
  }
  @media (min-width: 1550px) {
    right: 5%;
  }
  @media (min-width: 1900px) {
    right: 7%;
  }
`

class CampaignStatusChiclet extends Component {
  getStatusLabel(campaign) {
    try {
      // eslint-disable-next-line default-case
      switch (campaign.status) {
        case 'pending':
          return 'Pending'
        case 'accepted':
          if (moment().isAfter(campaign.startDate)) {
            return 'Active'
          } else {
            return 'Accepted'
          }
        case 'rejected':
          return 'Rejected'
      }
    } catch (e) {
      return null
    }
  }
  render() {
    const { campaign, currentUser } = this.props
    const status = this.getStatusLabel(campaign)

    const userType =
      currentUser && currentUser.hasOwnProperty('attributes')
        ? currentUser.attributes.userType
        : null

    return userType === 'brand' ? (
      <Container>
        Placement is {status}
        <CampaignStatusDot campaign={campaign} />
      </Container>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(CampaignStatusChiclet)
