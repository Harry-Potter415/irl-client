import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StatusIcons from 'components/campaignApply/StatusIcons'
import { Link } from 'react-router-dom'
import { isMobile } from 'helpers/utils'
import { Typography, Card, Button, CardContent } from '@material-ui/core'
import styled from 'styled-components'

const CardTitle = styled(Typography)`
  padding: 1rem 0 0.5rem;
`

class StatusCardDelivered extends Component {
  render() {
    const { campaign } = this.props
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" paragraph>
            Your items have been delivered
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            {
              'This is great news. The next step you need to do is to take photos with your items and then upload photos to this placement. Remember to upload photos inline with the rules and regulations listed below.'
            }
          </Typography>
        </CardContent>
        <StatusIcons
          status="delivered"
          action={
            <Link to={`/placements/${campaign.id}/images`}>
              <Button variant="contained" color="primary">
                Upload Product Photos
              </Button>
            </Link>
          }
        />
      </Card>
    )
  }
}

StatusCardDelivered.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardDelivered
