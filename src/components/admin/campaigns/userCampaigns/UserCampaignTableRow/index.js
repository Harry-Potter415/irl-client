import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import CheckboxInput from 'components/inputs/CheckboxInput'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import SetStatusModal from 'components/admin/userCampaigns/SetStatusModal'
import { USER_CAMPAIGN_STATUSES, USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import { Link } from 'react-router-dom'

const MenuButton = styled(IconButton)`
  float: right;
`
class UserCampaignTableRow extends Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null,
      menuOpen: false,
      statusModalOpen: false,
    }
  }

  handleToggleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      menuOpen: !this.state.menuOpen,
    })
  }

  handleToggleStatusModal = e => {
    this.setState({
      statusModalOpen: !this.state.statusModalOpen,
    })
  }

  statusColor = userCampaign => {
    const { pending, rejected } = USER_CAMPAIGN_STATUSES
    return [pending, rejected].indexOf(userCampaign.status) >= 0 ? 'default' : 'primary'
  }

  render() {
    const { userCampaign, isSelected, toggleActive } = this.props
    const { anchorEl, menuOpen } = this.state

    return (
      <TableRow>
        <TableCell>
          <CheckboxInput
            value={isSelected(userCampaign.id)}
            handleChange={() => {
              toggleActive(userCampaign.id)
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/admin/users/${userCampaign.user.id}/edit`}>{userCampaign.user.name}</Link>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/admin/placements/${userCampaign.campaign.id}`}>
            {userCampaign.campaign.title}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {userCampaign.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {userCampaign.quantity}
        </TableCell>
        <TableCell component="th" scope="row">
          <Chip
            label={USER_CAMPAIGN_DISPLAY_STATUSES[userCampaign.status]}
            color={this.statusColor(userCampaign)}
          />
        </TableCell>
        <TableCell align="right" ref={this.anchorRef}>
          <MenuButton aria-label="More" aria-haspopup="true" onClick={this.handleToggleMenu}>
            <MoreVertIcon />
            <Menu id="long-menu" open={menuOpen} anchorEl={anchorEl} onClose={this.handleOpenMenu}>
              <MenuItem
                key="hosts-link"
                ref={this.createRef}
                onClick={this.handleToggleStatusModal}
              >
                Edit
              </MenuItem>
            </Menu>
          </MenuButton>
          <SetStatusModal
            isOpen={this.state.statusModalOpen}
            onClose={this.handleToggleStatusModal}
            userCampaign={userCampaign}
          />
        </TableCell>
      </TableRow>
    )
  }
}

UserCampaignTableRow.propTypes = {
  userCampaign: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

UserCampaignTableRow.defaultProps = {
  warehouseAddressOptions: [],
}

export default UserCampaignTableRow
