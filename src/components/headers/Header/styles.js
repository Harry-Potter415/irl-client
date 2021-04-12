import styled from 'styled-components'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu, Person, ShoppingCart, Search, AccountBox, PersonPin } from '@material-ui/icons'
import config from 'shopjs/config'

export const StyledToolbar = styled(Toolbar)`
  color: ${config.theme.colors.primary};
  background-color: white;
`

export const StyledTypography = styled(Typography)`
  color: ${config.theme.colors.primary};
`

export const StyledIconButton = styled(IconButton)`
  color: ${config.theme.colors.primary};
`

export const StyledMenu = styled(Menu)`
  color: ${config.theme.colors.primary};
`
export const StyledPerson = styled(Person)`
  color: ${config.theme.colors.primary};
`

export const StyledShoppingCart = styled(ShoppingCart)`
  color: ${config.theme.colors.primary};
`

export const StyledSearch = styled(Search)`
  color: ${config.theme.colors.primary};
`
