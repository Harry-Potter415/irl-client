import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from 'icons/CommentIcon'
import { Link } from 'react-router-dom'
import { Menu, TableRow, TableCell } from '@material-ui/core'
import styled from 'styled-components'
import { tableImage } from 'helpers/cloudinary'
import { TableImage } from 'components/layout/TableImage'

const CommentMenuButton = styled(IconButton)`
  position: relative;
  top: 2px;
  float: right;
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

class ProductTableRow extends Component {
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
    const { product } = this.props
    return (
      <TableRow>
        <TableCell>
          <TableImage src={tableImage(product.imageUrl)} />
        </TableCell>
        <TableCell component="th" scope="row">
          {product.id}
        </TableCell>
        <TableCell>
          <Link to={`/admin/products/${product.id}`}>{product.title}</Link>
        </TableCell>
        <TableCell align="right">
          <Link to={`/admin/products/${product.id}/reviews`}>
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

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductTableRow
