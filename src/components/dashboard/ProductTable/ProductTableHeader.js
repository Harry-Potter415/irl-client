import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const ProductTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th">Product</TableCell>
      <TableCell component="th">Revenue</TableCell>
    </TableRow>
  </TableHead>
)

export default ProductTableHeader
