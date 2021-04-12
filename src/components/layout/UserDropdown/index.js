import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import { compose } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const User = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.textColor.secondary};
`
const Name = styled.span`
  cursor: pointer;
  margin-right: 0.5rem;
`
const Expand = styled(Icon)`
  color: ${props => props.theme.palette.textColor.secondary};
  cursor: pointer;
`

class UserDropdown extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle = e => {
    this.anchorEl = e.target
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    this.setState({ open: false })
  }

  handleLogoutClick = () => {
    const { logoutUser, showAlertSuccess } = this.props
    logoutUser()
    showAlertSuccess('Successfully logged out')
    this.setState({ open: false })
    // make sure any state is reset
    window.location.pathname = '/'
  }

  render() {
    const { currentUser, history } = this.props
    const { open } = this.state

    return (
      <User>
        <Name onClick={this.handleToggle}>{currentUser.attributes.name}</Name>
        <Expand
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          expand_more
        </Expand>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={() => history.push('/user/edit')}>Profile</MenuItem>
                    <MenuItem onClick={() => history.push('/user/edit/billing')}>Billing</MenuItem>
                    <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </User>
    )
  }
}

UserDropdown.propTypes = {
  user: PropTypes.object,
}

export default compose(
  withAlerts,
  withRouter
)(UserDropdown)
