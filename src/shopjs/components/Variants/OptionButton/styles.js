import styled from 'styled-components'
import { Button } from '@material-ui/core'
import config from 'shopjs/config'

let { main } = config.muiTheme.palette.primary

export const StyledButton = styled(Button)`
  margin-right: 0 5px 5px 0 !important;
  ${props =>
    props.active
      ? `border-bottom: 2px solid ${main} !important;`
      : `border-bottom: 2px solid white !important;`}
`
