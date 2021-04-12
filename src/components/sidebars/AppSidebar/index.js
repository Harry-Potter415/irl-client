import React, { Component, Fragment, forwardRef } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { isMobile } from 'helpers/utils'
import { List, Drawer, Hidden } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { isAdmin, isBrand, isHost } from 'helpers/user'
import { MENU_ITEMS } from 'lib/menu'
import { PRIMARY_GREEN } from 'lib/colors'

const MenuList = styled(List)`
  flex-shrink: 0;
  a.active,
  a:hover {
    span,
    path {
      color: ${PRIMARY_GREEN} !important;
    }
  }
`

const Forehead = styled.div`
  height: 50px;
`
class AppSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPath: '/',
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location
    this.setState({
      currentPath: pathname,
    })
  }

  handleSelectClick = item => {
    this.setState({
      currentPath: item.path,
    })
  }

  handleMobileMenu = () => {
    if (isMobile()) {
      this.props.closeMenu()
    }
  }

  renderMenuItems = userType => {
    const { isOpen } = this.props
    const { currentPath } = this.state

    const ForwardNavLink = forwardRef((props, ref) => <NavLink {...props} innerRef={ref} />)

    return MENU_ITEMS[userType].map((item, i) => (
      <MenuItem
        key={i}
        onClick={() => this.handleSelectClick(item)}
        component={ForwardNavLink}
        isActive={() => currentPath === item.path}
        to={item.path}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        {isOpen && <ListItemText primary={item.text} />}
      </MenuItem>
    ))
  }

  render() {
    const { currentUser, isOpen } = this.props

    const drawer = (
      <MenuList onClick={this.handleMobileMenu}>
        <Forehead />
        {isHost(currentUser) && this.renderMenuItems('host')}
        {isBrand(currentUser) && this.renderMenuItems('brand')}
        {isAdmin(currentUser) && (
          <Fragment>
            <Divider />
            {this.renderMenuItems('admin')}
          </Fragment>
        )}
      </MenuList>
    )

    return (
      <nav>
        <Hidden smUp>
          <Drawer
            container={this.props.container}
            anchor="left"
            open={isOpen}
            onClose={this.handleDrawerClose}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    )
  }
}

export default withRouter(AppSidebar)
