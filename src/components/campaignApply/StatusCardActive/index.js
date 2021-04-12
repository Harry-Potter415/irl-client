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

class StatusCardActive extends Component {
  render() {
    const { campaign } = this.props
    const brand = campaign.product.brand || 'BRAND'
    return (
      <Card elevation={isMobile() ? 0 : 3}>
        <CardContent>
          <CardTitle variant="h4" gutterBottom>
            Your placement is now active
          </CardTitle>
          <Typography variant="body1" gutterBottom>
            Enjoy!
          </Typography>
        </CardContent>
        <StatusIcons status="processing" />
      </Card>
    )
  }
}

StatusCardActive.propTypes = {
  campaign: PropTypes.object,
}

export default StatusCardActive
