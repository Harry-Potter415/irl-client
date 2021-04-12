import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withAuth } from 'hocs/withAuth'
import { withRouter } from 'react-router'
import { Hidden, IconButton, Button, withWidth } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Logo from 'assets/images/logo.svg'
import styled from 'styled-components'
import AppHeader from 'components/headers/AppHeader'
import AppSidebar from 'components/sidebars/AppSidebar'
import MenuIcon from 'icons/MenuIcon'
import UserDropdown from 'components/layout/UserDropdown'
import { toggleSidebar } from 'actions/layout'
import { selectSidebarDisabled, selectSidebarOpen } from 'selectors/layout'
import { Autocomplete, CartDrawer, CartToggleButton } from 'shopjs/components'
import { isHost, isAdmin } from 'helpers/user'

const ToggleButton = styled(IconButton)`
  padding: 4px !important;

  &:hover: {
    background-color: transparent;
  }

  margin-left: -3px !important;
  margin-right: 15px !important;
  height: 35px;
  width: 35px;
`

const HeaderLink = styled(Button)`
  display: flex;
  align-items: center;
`

const Spacer = styled.div`
  flex-grow: 1;
`

const Img = styled.img`
  margin-right: 10px;
`

const Header = props => {
  const { toggleSidebar, width, currentUser, isSidebarDisabled, isSidebarOpen, history } = props

  useEffect(() => {
    if (['xs', 'sm'].includes(width)) {
      toggleSidebar(false)
    }
  }, [toggleSidebar, width])

  const toggleMenu = () => {
    const { toggleSidebar, isSidebarOpen } = props
    toggleSidebar(!isSidebarOpen)
  }

  const closeMenu = () => {
    const { toggleSidebar } = props
    toggleSidebar(false)
  }

  return (
    <Fragment>
      <AppHeader {...props}>
        {!isSidebarDisabled && (
          <ToggleButton variant="text" onClick={toggleMenu} aria-label="Toggle Menu">
            <MenuIcon viewBox="0 0 20 20" style={{ fontSize: 30 }} />
          </ToggleButton>
        )}
        <Link to="/">
          <Img alt="Logo" src={Logo} height={28} />
        </Link>
        {currentUser && (isHost(currentUser) || isAdmin(currentUser)) && (
          <Hidden only={['xs']}>
            <Autocomplete />
          </Hidden>
        )}
        <Spacer />
        {currentUser ? (
          <>
            <UserDropdown {...props} />
            {isHost(currentUser) && <CartToggleButton />}
          </>
        ) : (
          <Fragment>
            <HeaderLink onClick={() => history.push('/login')} color="inherit">
              Login
            </HeaderLink>
            <HeaderLink onClick={() => history.push('/signup')} color="inherit">
              Sign Up
            </HeaderLink>
          </Fragment>
        )}
      </AppHeader>
      {!isSidebarDisabled && <AppSidebar isOpen={isSidebarOpen} closeMenu={closeMenu} {...props} />}
      <CartDrawer />
    </Fragment>
  )
}

const mapStateToProps = state => {
  const isSidebarDisabled = selectSidebarDisabled(state)
  const isSidebarOpen = selectSidebarOpen(state)
  return {
    isSidebarDisabled,
    isSidebarOpen,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ toggleSidebar }, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth,
  withWidth(),
  withRouter
)(Header)
