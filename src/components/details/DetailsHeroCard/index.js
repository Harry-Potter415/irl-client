import React, { Component } from 'react'
import styled from 'styled-components'
import { globalStyles } from 'components/globalStyles'
import DetailsHeroControls from 'components/details/DetailsHeroControls'
import { Grid, Paper } from '@material-ui/core'
import DetailsImage from 'components/layout/DetailsImage'
import { isMobileOrTablet } from 'helpers/utils'

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  @media (max-width: 600px) {
    width: calc(100% + ${2 * globalStyles.content.mobilePadding}px);
    margin-left: -${globalStyles.content.mobilePadding}px;
  }
`

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100% - 58px);
  padding: ${globalStyles.content.padding}px;
  position: relative;
  padding-left: 0;
  @media (max-width: 600px) {
    height: auto;
    padding: ${globalStyles.content.mobilePadding}px;
  }
`

const MobileControlsContainer = styled(Grid)`
  padding: 0.5rem 10px;
`
const DesktopControlsContainer = styled(Grid)`
  margin-bottom: 24px;
`

class DetailsHeroCard extends Component {
  render() {
    const { editHref, DeleteButton, canEdit, imageUrl, images } = this.props

    const controls = (
      <DetailsHeroControls editHref={editHref} DeleteButton={DeleteButton} canEdit={canEdit} />
    )

    return (
      <Container className="details-hero-card">
        <Paper elevation={0}>
          {!isMobileOrTablet() && (
            <DesktopControlsContainer item xs={12} md={12} children={controls} />
          )}
          <Grid container direction="row" spacing={6}>
            {isMobileOrTablet() && (
              <MobileControlsContainer item xs={12}>
                {controls}
              </MobileControlsContainer>
            )}
            <DetailsImage imageUrl={imageUrl} images={images} />
            <Grid item xs={12} md={6}>
              <DetailsContent>{this.props.children}</DetailsContent>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
  }
}

export default DetailsHeroCard
