import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import DetailsListItem from 'components/details/DetailsListItem'
import StatusIcons from 'components/campaignApply/StatusIcons'
import { isMobile } from 'helpers/utils'
import { deliverUserCampaign } from 'actions/campaigns'
import { Card, Button, CardContent } from '@material-ui/core'
import styled from 'styled-components'

const CardTitle = styled(Typography)`
  padding: 1rem 0 0.5rem;
`

class StatusCardShipped extends Component {
  render() {
    const { campaign, deliverUserCampaign } = this.props

    const address1 = '1012 Becca Drive'
    const city = 'New York'
    const state = 'NY'
    const zip = '10012'

    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" paragraph>
            Your order has shipped.
          </CardTitle>
          <DetailsListItem
            label="Shipping Address"
            value={`${address1}, ${city}, ${state} ${zip}`}
          />
        </CardContent>
        <StatusIcons
          status="shipped"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={deliverUserCampaign.bind(null, campaign.currentUserCampaign.id)}
            >
              I Received This Order
            </Button>
          }
        />
      </Card>
    )
  }
}

StatusCardShipped.propTypes = {
  campaign: PropTypes.object,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deliverUserCampaign,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusCardShipped)
