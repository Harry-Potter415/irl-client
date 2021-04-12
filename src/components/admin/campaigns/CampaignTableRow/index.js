import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import config from 'config'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from 'icons/CommentIcon'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
import CheckboxInput from 'components/inputs/CheckboxInput'
import styled from 'styled-components'
import { tableImage } from 'helpers/cloudinary'
import { TableImage } from 'components/layout/TableImage'

const CommentMenuButton = styled(IconButton)`
  position: relative;
  top: 2px;
`
const StyledCommentIcon = styled(CommentIcon)`
  && {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 20px;
  }
`
const MenuButton = styled(IconButton)`
  float: right;
`

class CampaignTableRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      statusModalOpen: false,
      anchorEl: null,
    }
  }

  handlStatusModal = e => {
    this.setState({
      ...this.state,
      statusModalOpen: !this.state.statusModalOpen,
    })
  }

  get period() {
    const { campaign } = this.props
    const start = moment(campaign.startDate).format(config.DATE_FORMAT)
    const end = moment(campaign.endDate).format(config.DATE_FORMAT)
    return `${start} - ${end}`
  }

  handleToggleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      open: !this.state.open,
    })
  }

  renderMenu = () => {
    const { campaign } = this.props
    const { anchorEl, open } = this.state
    return (
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
        <MenuItem component={Link} to={`/admin/placements/${campaign.id}/edit`}>
          Edit
        </MenuItem>
        <MenuItem
          key="approve-images-link"
          component={Link}
          to={`placements/${campaign.id}/approve-images`}
          onClick={this.handleClose}
        >
          Approve Placement Photos
        </MenuItem>
        <MenuItem
          key="hosts-link"
          component={Link}
          onClick={this.handleClose}
          to={`placements/${campaign.id}/hosts`}
        >
          Approve Hosts
        </MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { campaign, isSelected, toggleActive } = this.props
    return (
      <TableRow>
        <TableCell>
          <CheckboxInput
            value={isSelected(campaign.id)}
            handleChange={() => {
              toggleActive(campaign.id)
            }}
          />
        </TableCell>
        <TableCell>
          <TableImage src={tableImage(campaign.imageUrl)} />
        </TableCell>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>
          <Link to={`/admin/placements/${campaign.id}`}>{campaign.title}</Link>
        </TableCell>
        <TableCell>{this.period}</TableCell>
        <TableCell>
          <Chip
            label={campaign.status}
            color={campaign.status === 'accepted' ? 'primary' : 'default'}
          />
        </TableCell>
        <TableCell>
          <Link to={`/admin/addresses/${campaign.warehouseAddressId}`}>
            {campaign.warehouseAddressId}
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`placements/${campaign.id}/approve-images`}>{campaign.imagesCount}</Link>
        </TableCell>
        <TableCell>
          <Link to={`placements/${campaign.id}/hosts`}>{campaign.userCampaignsCount}</Link>
        </TableCell>
        <TableCell>
          <Link to={`/admin/placements/${campaign.id}/reviews`}>
            <CommentMenuButton>
              <StyledCommentIcon />
            </CommentMenuButton>
          </Link>
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

CampaignTableRow.propTypes = {
  campaign: PropTypes.object.isRequired,
  warehouseAddressOptions: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

CampaignTableRow.defaultProps = {
  warehouseAddressOptions: [],
}

export default CampaignTableRow
