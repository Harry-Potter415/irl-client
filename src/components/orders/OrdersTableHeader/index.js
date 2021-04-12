import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const OrdersTableHeader = props => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Order #</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Products</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Quantity</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default OrdersTableHeader
