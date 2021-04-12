import React, { Component } from 'react'
import styled from 'styled-components'

import { theme } from 'components/theme'
import BaseAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const AppBar = styled(BaseAppBar)`
  border-bottom: solid 1px ${theme.palette.borderColor.main};
  z-index: ${theme.zIndex.drawer + 1} !important;
  color: ${theme.palette.textColor.secondary} !important;

  a {
    color: ${theme.palette.textColor.secondary} !important;
  }
`
class AppHeader extends Component {
  render() {
    return (
      <AppBar color="inherit" elevation={0} position="fixed">
        <Toolbar disableGutters variant="dense">
          {this.props.children}
        </Toolbar>
      </AppBar>
    )
  }
}

export default AppHeader
