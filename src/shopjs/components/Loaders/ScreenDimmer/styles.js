import styled from 'styled-components'
import { Box } from '@material-ui/core'

export const Dimmer = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #fff;
  opacity: 0.4;
`
