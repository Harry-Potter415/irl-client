import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const UserTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th">ID</TableCell>
      <TableCell component="th">Name</TableCell>
      <TableCell component="th">Email</TableCell>
      <TableCell component="th">Status</TableCell>
      <TableCell component="th">User Type</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default UserTableHeader
