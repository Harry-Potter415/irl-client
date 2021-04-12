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

class StatusCardFinished extends Component {
  render() {
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" gutterBottom>
            Your placement is complete!
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            Thank you for uploading your photos, they look great.
          </Typography>
        </CardContent>
        <StatusIcons status="finished" />
      </Card>
    )
  }
}

StatusCardFinished.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardFinished
