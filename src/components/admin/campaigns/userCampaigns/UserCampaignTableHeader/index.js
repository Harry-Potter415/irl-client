import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const UserCampaignTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th">User</TableCell>
      <TableCell component="th">Placement</TableCell>
      <TableCell component="th">Description</TableCell>
      <TableCell component="th">Quantity</TableCell>
      <TableCell component="th">Status</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default UserCampaignTableHeader
