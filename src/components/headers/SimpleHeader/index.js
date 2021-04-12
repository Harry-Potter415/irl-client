import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withAuth } from 'hocs/withAuth'
import { withRouter } from 'react-router'
import withWidth from '@material-ui/core/withWidth'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import Logo from 'assets/images/logo.svg'
import styled from 'styled-components'
import AppHeader from 'components/headers/AppHeader'
import AppSidebar from 'components/sidebars/AppSidebar'
import MenuIcon from 'icons/MenuIcon'
import { toggleSidebar } from 'actions/layout'
import { selectSidebarDisabled, selectSidebarOpen } from 'selectors/layout'
import { CartDrawer } from 'shopjs/components'

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

const Img = styled.img`
  margin-right: 30px;
`

const SimpleHeader = props => {
  const { toggleSidebar, width, isSidebarDisabled, isSidebarOpen } = props

  useEffect(() => {
    if (['xs', 'sm'].includes(width)) {
      toggleSidebar(true)
    }
  }, [width, toggleSidebar])

  const toggleMenu = () => {
    toggleSidebar(!isSidebarOpen)
  }

  const closeMenu = () => {
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
)(SimpleHeader)
