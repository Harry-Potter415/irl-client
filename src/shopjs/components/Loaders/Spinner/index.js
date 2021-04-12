import React from 'react'
import { StyledBox, StyledLinearProgress } from './styles'

const Spinner = () => (
  <StyledBox my={30} display="flex" justifyContent="center">
    <StyledLinearProgress size={3} />
  </StyledBox>
)

export default Spinner
