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

class StatusCardRejected extends Component {
  render() {
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" gutterBottom>
            Sorry!
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            Your application was rejected
          </Typography>
        </CardContent>
        <StatusIcons status="processing" />
      </Card>
    )
  }
}

StatusCardRejected.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardRejected
