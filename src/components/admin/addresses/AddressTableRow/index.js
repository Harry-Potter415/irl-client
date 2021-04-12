import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, TableRow, TableCell } from '@material-ui/core'
import { deleteAddress } from 'actions/admin/addresses'
import styled from 'styled-components'

const MenuButton = styled(IconButton)`
  float: right;
`

class AddressTableRow extends Component {
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

  renderMenu = () => {
    const { address } = this.props
    const { anchorEl, open } = this.state
    return (
      <Menu open={open} anchorEl={anchorEl}>
        <MenuItem component={Link} to={`/admin/addresses/${address.id}/edit`}>
          Edit
        </MenuItem>
      </Menu>
    )
  }

  render() {
    const { address } = this.props
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {address.id}
        </TableCell>
        <TableCell>{[address.address1, address.address2].join(' - ')}</TableCell>
        <TableCell>{address.city}</TableCell>
        <TableCell>{address.state}</TableCell>
        <TableCell>{address.country}</TableCell>
        <TableCell>{address.zipcode}</TableCell>
        <TableCell>
          <Chip
            label={address.isIrlOwner ? 'Yes' : 'No'}
            color={address.isIrlOwner ? 'primary' : 'default'}
          />
        </TableCell>
        <TableCell>
          <Link to={`/admin/users/${address.userId}/edit`}>{address.userId}</Link>
        </TableCell>
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

AddressTableRow.propTypes = {
  address: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteAddress,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressTableRow)
