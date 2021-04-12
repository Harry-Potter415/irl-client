import React, { Fragment } from 'react'
import { Grid, Typography, Hidden } from '@material-ui/core'
import { CenteredGrid, TotalPriceField, ItemTotal, SmallText } from './style'

const TotalRow = props => {
  const { name, value, text } = props
  return (
    <Fragment>
      <Hidden smDown>
        <Grid item md={9}>
          <SmallText variant="body1">{text}</SmallText>
        </Grid>
      </Hidden>
      <CenteredGrid item md={2} xs={8} className="first-column">
        <TotalPriceField>
          <Typography variant="body1">{name}</Typography>
        </TotalPriceField>
      </CenteredGrid>
      <CenteredGrid item md={1} xs={4}>
        <ItemTotal>
          <Typography variant="body1">{value}</Typography>
        </ItemTotal>
      </CenteredGrid>
      <Hidden mdUp>
        <Grid item xs={12}>
          <SmallText variant="body1">{text}</SmallText>
        </Grid>
      </Hidden>
    </Fragment>
  )
}

export default TotalRow
