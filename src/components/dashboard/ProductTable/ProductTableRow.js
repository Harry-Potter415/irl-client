import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@material-ui/core'

const ProductTableRow = ({ product }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {product.product}
      </TableCell>
      <TableCell component="th" scope="row">
        {product.revenue}
      </TableCell>
    </TableRow>
  )
}

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductTableRow
