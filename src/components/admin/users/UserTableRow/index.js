import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, TableRow, TableCell } from '@material-ui/core'
import CheckboxInput from 'components/inputs/CheckboxInput'
import styled from 'styled-components'
import { USER_DISPLAY_STATUSES } from 'lib/constants'
import config from 'config'

const MenuButton = styled(IconButton)`
  float: right;
`

class UserTableRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null,
    }
  }

  handleToggleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      open: !this.state.open,
    })
  }

  get userQrCodeUrl() {
    const { user } = this.props
    const authToken = localStorage.getItem('authToken')
    return `${config.REACT_APP_API_URL}/api/v1/admin/users/${user.id}/qr_code.pdf?token=${authToken}`
  }

  copyUserQrCodeUrl = e => {
    const {
      user: { qrCodeUrl },
    } = this.props
    navigator.clipboard.writeText(qrCodeUrl)
    this.handleToggleMenu(e)
  }

  renderMenu = () => {
    const { user } = this.props
    const { anchorEl, open } = this.state
    return (
      <Menu open={open} anchorEl={anchorEl}>
        <MenuItem key="edit-user" component={Link} to={`/admin/users/${user.id}/edit`}>
          Edit
        </MenuItem>
        <MenuItem
          key="qr-link"
          href={this.userQrCodeUrl}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          onClick={this.handleToggleMenu}
        >
          View QR Card
        </MenuItem>
        <MenuItem key="copy-qr-link1" component="a" onClick={this.copyUserQrCodeUrl}>
          Copy Url Link
        </MenuItem>
      </Menu>
    )
  }

  render() {
    const { user, isSelected, toggleActive } = this.props
    return (
      <TableRow>
        <TableCell>
          <CheckboxInput
            value={isSelected(user.id)}
            handleChange={() => {
              toggleActive(user.id)
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {user.id}
        </TableCell>
        <TableCell>
          <Link to={`/admin/users/${user.id}/edit`}>{user.name}</Link>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Chip
            label={USER_DISPLAY_STATUSES[user.status]}
            color={user.status === 'accepted' ? 'primary' : 'default'}
          />
        </TableCell>
        <TableCell>{user.userType}</TableCell>
        <TableCell>
          <MenuButton aria-label="More" aria-haspopup="true" onClick={this.handleToggleMenu}>
            <MoreVertIcon />
            {this.renderMenu()}
          </MenuButton>
        </TableCell>
      </TableRow>
    )
  }
}

UserTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

export default UserTableRow
