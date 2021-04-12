import React from 'react'
import { useAccountOrders } from 'shopjs/hooks'
import { Breadcrumb, Placeholder, Pagination, OrderItem } from 'shopjs/components'
import { Container, Paper, Box, Grid, List, Typography } from '@material-ui/core'
import { Loyalty } from '@material-ui/icons'

const OrdersList = () => {
  const [
    { page, hasNextPage, hasPreviousPage },
    { getPreviousPage, getNextPage },
  ] = useAccountOrders()

  let totalOrders = 0
  totalOrders = !!page && page.length

  return (
    <>
      <Container>
        <Breadcrumb current="Orders" />
      </Container>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">Order History</Typography>
        </Box>
        <Box my={4}>
          <List>
            {!!page && page.map(({ node: order }) => <OrderItem key={order.id} order={order} />)}
          </List>

          {totalOrders === 0 && (
            <Placeholder
              icon={<Loyalty />}
              title="No orders yet"
              subtitle="Your orders will appear here"
            />
          )}

          {(hasPreviousPage || hasNextPage) && (
            <Pagination
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onNextClick={getNextPage}
              onPreviousClick={getPreviousPage}
            />
          )}
        </Box>
      </Container>
    </>
  )
}

export default OrdersList
