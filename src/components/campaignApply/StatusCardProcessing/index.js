import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import StatusIcons from 'components/campaignApply/StatusIcons'
import { isMobile } from 'helpers/utils'
import { Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'

const CardTitle = styled(Typography)`
  padding: 1rem 0 0.5rem;
`

class StatusCardProcessing extends Component {
  render() {
    const { campaign } = this.props
    const brand = campaign.user.company
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" gutterBottom>
            Your order is being processed{!!brand ? ` by ${brand}` : null}.
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            Awesome, you’re order is getting packaged and ready. It will be getting to you shortly.
            During this period, there is nothing for your to do. Keep an eye out for an email of a
            shipment notice.
          </Typography>
        </CardContent>
        <StatusIcons status="processing" />
      </Card>
    )
  }
}

StatusCardProcessing.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardProcessing
