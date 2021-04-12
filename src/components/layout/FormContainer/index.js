import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  padding-bottom: 2rem;
`

export default ({ justify = 'center', children, md = 5, ...rest }) => {
  return (
    <Grid container justify={justify} {...rest}>
      <StyledGrid item md={md}>
        {children}
      </StyledGrid>
    </Grid>
  )
}
