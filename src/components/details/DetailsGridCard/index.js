import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { Grid, Card, CardContent } from '@material-ui/core'

const DetailsCard = styled(Card)`
  height: 100%;
`

const Container = styled(Grid)`
  @media (max-width: 600px) {
    padding: 0 !important;
  }
`

class DetailsGridCard extends Component {
  render() {
    const { header, size } = this.props

    return (
      <Container item xs={12} md={size}>
        <DetailsCard raised={false} elevation={1}>
          <CardContent>
            <Typography paragraph variant="caption">
              {header}
            </Typography>
            {this.props.children}
          </CardContent>
        </DetailsCard>
      </Container>
    )
  }
}
DetailsGridCard.propTypes = {
  header: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
}

export default DetailsGridCard
