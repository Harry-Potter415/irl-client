import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckboxInput from 'components/inputs/CheckboxInput'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
import { tableImage } from 'helpers/cloudinary'
import { TableImage } from 'components/layout/TableImage'
import { truncate, formatDate } from 'helpers/utils'
import { REVIEW_DISPLAY_STATUSES } from 'lib/constants'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const MenuButton = styled(IconButton)`
  float: right;
`

class ReviewTableRow extends Component {
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
    const { review } = this.props
    const { anchorEl, open } = this.state
    return (
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
        <MenuItem
          key="approve-review-images-link"
          component={Link}
          to={`reviews/${review.id}/approve-images`}
          onClick={this.handleClose}
        >
          Approve Review Photos
        </MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { review, isSelected, toggleActive } = this.props
    return (
      <TableRow>
        <TableCell>
          <CheckboxInput
            value={isSelected(review.id)}
            handleChange={() => {
              toggleActive(review.id)
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <TableImage src={tableImage(review.product.imageUrl)} />
        </TableCell>
        <TableCell>
          <Link to={`/admin/products/${review.product.id}`}>{review.product.id}</Link>
        </TableCell>
        <TableCell>{review.userName}</TableCell>
        <TableCell>{review.userEmail}</TableCell>
        <TableCell>
          <Link to={`/admin/reviews/${review.id}`}>{truncate(review.comment, 20)}</Link>
        </TableCell>
        <TableCell>{review.rating}</TableCell>
        <TableCell>{REVIEW_DISPLAY_STATUSES[review.status]}</TableCell>
        <TableCell>{formatDate(review.createdAt)}</TableCell>
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

ReviewTableRow.propTypes = {
  review: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

export default ReviewTableRow
