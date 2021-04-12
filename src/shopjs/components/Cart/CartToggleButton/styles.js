import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import config from 'shopjs/config'

export const StyledIconButton = styled(IconButton)`
  color: ${config.theme.colors.primary};
`

export const StyledShoppingCart = styled(ShoppingCart)`
  color: ${config.theme.colors.primary};
`
