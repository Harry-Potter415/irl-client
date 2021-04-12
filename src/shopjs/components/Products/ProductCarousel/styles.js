import styled from 'styled-components'
import { Button, Paper, Box } from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'

export const CarouselButton = styled(Button)`
  position: absolute !important;
`

export const CarouselContent = styled(Box)`
  overflow: hidden;
  position: relative;
  height: 400px;
  width: 100%;
  margin: 0 auto;
`

export const CarouselBox = styled(Box)`
  position: relative;
  transform: translate3d(0, 0, 0);
`

export const CarouselDefaultControls = styled(Box)`
  position: relative;
  margin: 0 auto;
`

export const StyledKeyboardArrowLeft = styled(KeyboardArrowLeft)`
  margin: 80px auto !important;
  height: 48px !important;
  width: 48px !important;
`

export const StyledKeyboardArrowRight = styled(KeyboardArrowRight)`
  margin: 80px auto !important;
  height: 48px !important;
  width: 48px !important;
`
