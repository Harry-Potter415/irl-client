import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const ReviewTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th">Latest Reviews</TableCell>
      <TableCell component="th">Rating</TableCell>
      <TableCell component="th">Product</TableCell>
      <TableCell component="th">Email</TableCell>
      <TableCell component="th">Name</TableCell>
      <TableCell component="th">Date</TableCell>
    </TableRow>
  </TableHead>
)

export default ReviewTableHeader
