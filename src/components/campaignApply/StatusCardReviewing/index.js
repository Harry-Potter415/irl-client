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

class StatusCardReviewing extends Component {
  render() {
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" gutterBottom>
            Your application is being reviewed.
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            If you are approved, you'll receive an email notification to see if you're a groovy fit
            for this placement. We're probably more excited than you are at this point.
          </Typography>
        </CardContent>
        <StatusIcons status="reviewing" />
      </Card>
    )
  }
}

StatusCardReviewing.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardReviewing
