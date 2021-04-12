import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const CampaignTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell component="th"></TableCell>
      <TableCell component="th"></TableCell>
      <TableCell component="th">ID</TableCell>
      <TableCell component="th">Name</TableCell>
      <TableCell component="th">Dates</TableCell>
      <TableCell component="th">Status</TableCell>
      <TableCell component="th">Extra Warehouse Address</TableCell>
      <TableCell component="th">Images</TableCell>
      <TableCell component="th">Hosts</TableCell>
      <TableCell component="th"></TableCell>
      <TableCell component="th"></TableCell>
    </TableRow>
  </TableHead>
)

export default CampaignTableHeader
