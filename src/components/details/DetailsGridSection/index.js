import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const OuterGrid = styled(Grid)`
  @media (max-width: 600px) {
    width: calc(100% + 40px) !important;
    margin: 0 -20px !important;
  }
`

class DetailsGridSection extends Component {
  render() {
    const { header } = this.props

    return (
      <Container className="details-gridSection">
        <OuterGrid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="h5">{header}</Typography>
          </Grid>
          {this.props.children}
        </OuterGrid>
      </Container>
    )
  }
}
DetailsGridSection.propTypes = {
  header: PropTypes.string,
}

export default DetailsGridSection
