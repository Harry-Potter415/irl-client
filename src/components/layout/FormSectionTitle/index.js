import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Title = styled(Typography)`
  font-weight: 500 !important;
  font-size: 0.7rem !important;
  margin: 10px 0 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const FormSectionTitle = ({ text }) => <Title>{text}</Title>

export default FormSectionTitle
