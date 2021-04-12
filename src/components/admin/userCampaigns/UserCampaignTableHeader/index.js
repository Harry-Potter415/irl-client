import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const UserCampaignTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th">Order #</TableCell>
      <TableCell component="th">Placement</TableCell>
      <TableCell component="th">Host</TableCell>
      <TableCell component="th">Company</TableCell>
      <TableCell component="th">Price</TableCell>
      <TableCell component="th">Status</TableCell>
      <TableCell component="th">Date</TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default UserCampaignTableHeader
