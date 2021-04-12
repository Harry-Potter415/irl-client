import styled from 'styled-components'
import { List } from '@material-ui/core'

export const StyledList = styled(List)`
  margin-top: 40px !important;
  width: ${props => (props.mobile === true ? '280px' : '400px')} !important;
`
