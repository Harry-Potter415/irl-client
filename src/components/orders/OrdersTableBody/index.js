import React from 'react'
import { Link } from 'react-router-dom'
import { TableBody, TableRow } from '@material-ui/core'
import { USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import { formatShortDate } from 'helpers/utils'
import { lineItemPrice, lineItemStatus, lineItemQuantity } from './lineItem'
import { StyledTableCell, ProductRow } from './style'
import { get } from 'lodash'
import { StatusLabel } from 'components/orders/StatusLabel'

const OrdersTableBody = props => {
  const { orders } = props
  return (
    <TableBody>
      {orders.map(order => {
        const { lineItems } = order
        return (
          <TableRow key={order.id}>
            <StyledTableCell>
              <Link to={`/orders/${order.dbId}`}>#{order.orderNumber}</Link>
            </StyledTableCell>
            <StyledTableCell>{formatShortDate(order.processedAt)}</StyledTableCell>
            <StyledTableCell>
              {lineItems.map(lineItem => {
                return <ProductRow>{get(lineItem, 'node.title')}</ProductRow>
              })}
            </StyledTableCell>
            <StyledTableCell>
              {lineItems.map(lineItem => {
                return <ProductRow>{lineItemPrice(lineItem)}</ProductRow>
              })}
            </StyledTableCell>
            <StyledTableCell>
              {lineItems.map(lineItem => {
                return <ProductRow>{lineItem.type}</ProductRow>
              })}
            </StyledTableCell>
            <StyledTableCell>
              {lineItems.map(lineItem => {
                const status = lineItemStatus(lineItem)
                return (
                  <ProductRow>
                    {status ? (
                      <StatusLabel label={USER_CAMPAIGN_DISPLAY_STATUSES[status]} status={status} />
                    ) : null}
                  </ProductRow>
                )
              })}
            </StyledTableCell>
            <StyledTableCell>
              {lineItems.map(lineItem => {
                return <ProductRow>{lineItemQuantity(lineItem)}</ProductRow>
              })}
            </StyledTableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default OrdersTableBody
