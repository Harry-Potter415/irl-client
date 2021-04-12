import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const ReviewTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th"></TableCell>
      <TableCell component="th">Product ID</TableCell>
      <TableCell component="th">Name</TableCell>
      <TableCell component="th">Email</TableCell>
      <TableCell component="th">Comment</TableCell>
      <TableCell component="th">Rating</TableCell>
      <TableCell component="th">Status</TableCell>
      <TableCell component="th">Created At</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default ReviewTableHeader
