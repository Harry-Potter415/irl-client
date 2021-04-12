import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { Menu, TableRow, TableCell } from '@material-ui/core'
import styled from 'styled-components'

const MenuButton = styled(IconButton)`
  float: right;
`

class MessageTableRow extends Component {
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
    const { anchorEl, open } = this.state
    return <Menu open={open} anchorEl={anchorEl}></Menu>
  }

  render() {
    const { message } = this.props
    console.log(message)
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell component="th" scope="row">
          {message.id}
        </TableCell>
        <TableCell>
          <Link to={`/admin/messages/${message.id}`}>{message.phoneNumber}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/messages/${message.id}`}>{message.message}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/messages/${message.id}`}>{message.addressedTo}</Link>
        </TableCell>
        <TableCell align="right">
          <MenuButton aria-label="More" aria-haspopup="true" onClick={this.handleToggleMenu}>
            <MoreVertIcon />
            {this.renderMenu()}
          </MenuButton>
        </TableCell>
      </TableRow>
    )
  }
}

MessageTableRow.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageTableRow
