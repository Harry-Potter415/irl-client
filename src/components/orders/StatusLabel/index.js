import styled from 'styled-components'
import { Chip } from '@material-ui/core'
import { theme } from 'components/theme'

const LABEL_COLORS = {
  pending: {
    background: theme.palette.label.pending,
    color: theme.palette.text.primary,
  },
  accepted: {
    background: theme.palette.label.accepted,
    color: theme.palette.text.primary,
  },
  rejected: {
    background: theme.palette.label.rejected,
    color: '#fff',
  },
  shipped: {
    background: theme.palette.primary.main,
    color: '#fff',
  },
  delivered: {
    background: theme.palette.primary.main,
    color: '#fff',
  },
}

export const StatusLabel = styled(Chip)`
  && {
    height: 100%;
    background-color: ${props => LABEL_COLORS[props.status].background};
    color: ${props => LABEL_COLORS[props.status].color};
  }
`
