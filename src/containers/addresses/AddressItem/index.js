import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Menu,
  MenuItem,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Place, MoreVert } from '@material-ui/icons'
import styled from 'styled-components'
import { renderAddressLine1, renderAddressLine2 } from 'helpers/addresses'

const PlaceIcon = styled(Place)`
  color: blue;
`

class AddressItem extends Component {
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

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
  }

  handleEditClick = () => {
    const { history, address } = this.props
    history.push(`/addresses/${address.id}/edit`)
  }

  renderMenu = () => {
    const { address, handleDeleteClick } = this.props
    const { open, anchorEl } = this.state
    return (
      <Menu open={open} onClose={this.handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={this.handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={e => handleDeleteClick(address)}>Delete</MenuItem>
      </Menu>
    )
  }

  render() {
    const { address } = this.props
    return (
      <ListItem button onClick={this.handleEditClick}>
        <ListItemIcon>
          <PlaceIcon primary={address.isPrimary} fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary={renderAddressLine1(address)}
          secondary={renderAddressLine2(address)}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={e => this.handleToggleMenu(e)}>
            <MoreVert />
            {this.renderMenu()}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default withRouter(AddressItem)
