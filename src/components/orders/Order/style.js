import styled from 'styled-components'
import { Grid, Button, Typography } from '@material-ui/core'
import { theme } from 'components/theme'

export const TrackButton = styled(Button)`
  && {
    margin: 1rem 0;
    .MuiButton-label {
      text-transform: uppercase;
    }
  }
`
export const OrderDetailsContainer = styled.div`
  margin-top: 2rem;
`
export const DetailsField = styled.div`
  border: 1px solid ${theme.palette.grey[300]};
  border-bottom: none;
  padding: 20px;
  display: flex;
  &:last-child {
    border-bottom: 1px solid ${theme.palette.grey[300]};
  }
`
export const CustomerDetailsField = styled(DetailsField)`
  display: block;
`
export const StatusDetailsField = styled(DetailsField)`
  display: block;
  h5 {
    margin-top: 0.5rem;
  }
`
export const Total = styled(DetailsField)`
  border-top: none;
`
export const PriceField = styled.span`
  margin-right: 18%;
  &:last-child {
    margin-right: 0;
  }
`
export const TotalPriceField = styled.span`
  margin-left: 36%;
  width: 58px;
  text-align: right;
`
export const ItemTotal = styled.div`
  ${theme.breakpoints.up('md')} {
    padding-right: 2rem;
  }
`
export const CenteredGrid = styled(Grid)`
  display: flex;
  align-items: center;
`
export const Image = styled.img`
  max-width: 100%;
`
export const SmallText = styled(Typography)`
  && {
    font-size: 12px;
  }
`
