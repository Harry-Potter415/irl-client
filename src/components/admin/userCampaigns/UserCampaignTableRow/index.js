import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import SetStatusModal from 'components/admin/userCampaigns/SetStatusModal'
import { USER_CAMPAIGN_STATUSES, USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import { get } from 'lodash'
import { formatPrice } from 'helpers/orders'
import { formatDate } from 'helpers/utils'

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
    const { userCampaign } = this.props
    const { anchorEl, menuOpen } = this.state

    const orderNumber = get(userCampaign, 'order.shopifyOrderNumber')
    const orderDate = get(userCampaign, 'order.createdAt')

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {orderNumber && <Link to={`/admin/orders/${userCampaign.id}`}>{`#${orderNumber}`}</Link>}
        </TableCell>
        <TableCell component="th" scope="row">
          {userCampaign.campaign.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {userCampaign.user.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {userCampaign.campaign.company}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatPrice(get(userCampaign, 'order.totalPriceV2'))}
        </TableCell>
        <TableCell component="th" scope="row">
          <Chip
            label={USER_CAMPAIGN_DISPLAY_STATUSES[userCampaign.status]}
            color={this.statusColor(userCampaign)}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {formatDate(orderDate)}
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
