import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const ProductTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th">ID</TableCell>
      <TableCell component="th">Name</TableCell>
      <TableCell component="th"></TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default ProductTableHeader
