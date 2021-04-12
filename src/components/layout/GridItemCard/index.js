import styled from 'styled-components'
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Typography,
} from '@material-ui/core'

export const Card = styled(MuiCard)`
  box-shadow: none !important;
`
export const CardActions = styled(MuiCardActions)`
  position: absolute;
  right: 0;
  top: 10px;
  padding: 0 !important;
  button {
    padding: 0 !important;
  }
`
export const CardActionArea = styled(MuiCardActionArea)`
  padding: 12px !important;
`

export const CardContent = styled(MuiCardContent)`
  padding: 0 !important;
  height: 150px;
`
export const CardMedia = styled(MuiCardMedia)`
  margin-bottom: 1rem;
`
export const Title = styled(Typography)`
  &.MuiTypography-root {
    margin: 0.3rem 0;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0.17px;
    line-height: 22px;
  }
`
