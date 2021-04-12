import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { Card, CardContent } from '@material-ui/core'

class CampaignApprovalCard extends Component {
  render() {
    const { campaign } = this.props
    return (
      <Fragment>
        {campaign.status === 'pending' && (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="h3">
                Your application is being reviewed.
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                If you are approved, you'll receive an email notification to see if you're a groovy
                fit for this placement. We're probably more excited than you are at this point.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Fragment>
    )
  }
}

CampaignApprovalCard.propTypes = {
  campaign: PropTypes.object,
  deleteCampaign: PropTypes.func,
}

export default CampaignApprovalCard
