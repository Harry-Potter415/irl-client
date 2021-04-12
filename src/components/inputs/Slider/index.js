import React from 'react'
import { default as MuiSlider } from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { theme } from 'components/theme'

const Label = styled(Typography)`
  color: ${theme.palette.text.secondary};
`

const Slider = props => {
  const { label } = props
  return (
    <div>
      <Label variant="body1">{label}</Label>
      <MuiSlider {...props} />
    </div>
  )
}

export default Slider
