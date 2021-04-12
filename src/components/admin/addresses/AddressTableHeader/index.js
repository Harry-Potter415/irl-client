import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const AddressTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th">ID</TableCell>
      <TableCell component="th">Address</TableCell>
      <TableCell component="th">City</TableCell>
      <TableCell component="th">State</TableCell>
      <TableCell component="th">Country</TableCell>
      <TableCell component="th">Zipcode</TableCell>
      <TableCell component="th">Extra Owner</TableCell>
      <TableCell component="th">User ID</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default AddressTableHeader
