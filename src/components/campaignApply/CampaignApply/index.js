import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import StatusCardNew from 'components/campaignApply/StatusCardNew'
import StatusCardReviewing from 'components/campaignApply/StatusCardReviewing'
import StatusCardProcessing from 'components/campaignApply/StatusCardProcessing'
import StatusCardShipped from 'components/campaignApply/StatusCardShipped'
import StatusCardDelivered from 'components/campaignApply/StatusCardDelivered'
import StatusCardRejected from 'components/campaignApply/StatusCardRejected'

const Container = styled.div`
  margin: 2rem auto;
  width: 100%;
`

class CampaignApply extends Component {
  get CurrentStatus() {
    switch (get(this.props.campaign, 'currentUserCampaign.status')) {
      case 'pending':
        if (get(this.props.campaign, 'currentUserCampaign.order.shopifyOrderId')) {
          return StatusCardReviewing
        } else {
          return StatusCardNew
        }
      case 'accepted':
        return StatusCardProcessing
      case 'rejected':
        return StatusCardRejected
      case 'shipped':
        return StatusCardShipped
      case 'delivered':
        return StatusCardDelivered
      default:
        return StatusCardNew
    }
  }

  render() {
    const StatusComponent = this.CurrentStatus

    return (
      <Container>
        <StatusComponent {...this.props} />
      </Container>
    )
  }
}

CampaignApply.propTypes = {
  campaign: PropTypes.object,
}

export default CampaignApply
