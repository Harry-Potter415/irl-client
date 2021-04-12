import React from 'react'
import { Typography, Grid, Link, Button } from '@material-ui/core'
import { StyledGrid } from './styles'

const MarketingNotification = ({ text, buttonText, onClick }) => {
  return (
    <StyledGrid container spacing={0} alignItems="center" justify="center" direction="row">
      <Grid item>{!!text && <Typography>{text}</Typography>}</Grid>
      {!!buttonText && (
        <Grid item>
          <Link component={Button} onClick={onClick}>
            <Typography>{buttonText}</Typography>
          </Link>
        </Grid>
      )}
    </StyledGrid>
  )
}

export default MarketingNotification
