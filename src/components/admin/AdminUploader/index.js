import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { globalStyles } from 'components/globalStyles'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const StyledFormControl = styled(FormControl)`
  .delete-image-button {
    position: static;
    margin-top: 0.5rem;
  }
`

export default ({ children, label, ...rest }) => (
  <StyledFormControl id="uploader" fullWidth style={globalStyles.top10}>
    <Typography variant="caption" gutterBottom>
      {label}
    </Typography>
    {children}
  </StyledFormControl>
)
