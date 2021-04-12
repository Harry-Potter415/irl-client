import React, { Component, Fragment } from 'react'
import { globalStyles } from 'components/globalStyles'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import BackButton from 'components/layout/BackButton'
import EditButton from 'components/layout/EditButton'

const Container = styled.div`
  color: ${props => props.theme.palette.textColor.secondary} !important;
  padding: 0 ${globalStyles.content.padding}px 0 0;
  a {
    color: ${props => props.theme.palette.textColor.secondary} !important;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 20px 0;
    .material-icons {
      display: none;
    }
    span {
      padding: 0;
    }
  }
  @media (min-width: 601px) and (max-width: 960px) {
    margin-top: -10px;
    padding: 0;
  }
`

class DetailsHeroControls extends Component {
  render() {
    const { editHref, DeleteButton, canEdit } = this.props

    return (
      <Container>
        <Grid container justify="space-between" className="detail-hero-controls">
          <Grid item style={{ zIndex: 2 }}>
            <BackButton />
          </Grid>
          {canEdit && (
            <Fragment>
              <Grid item>
                <EditButton url={editHref} />
              </Grid>
              <Grid item>{DeleteButton}</Grid>
            </Fragment>
          )}
        </Grid>
      </Container>
    )
  }
}

DetailsHeroControls.propTypes = {
  backHref: PropTypes.string,
  editHref: PropTypes.string,
  canEdit: PropTypes.bool,
}

export default DetailsHeroControls
