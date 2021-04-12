import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const MessageTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th">ID</TableCell>
      <TableCell component="th">Phone Number</TableCell>
      <TableCell component="th">Message</TableCell>
      <TableCell component="th">Addressed To</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default MessageTableHeader
