import React, { useContext, useEffect } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { useAccountOrder } from 'shopjs/hooks'
import { Breadcrumb, OrderDetailsItem } from 'shopjs/components'
import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { get } from 'shopjs/helpers'
import Link from '@material-ui/core/Link'

const OrderDetails = ({
  match: {
    params: { number: currentOrderNumber },
  },
}) => {
  const [{ order, orderNumber }, { setOrderNumber }] = useAccountOrder()
  const {
    formatters: { dateTime, currency },
  } = useContext(ShopifyContext)

  const handleStatusClick = () => {
    window.open(order.statusUrl, '_blank')
  }

  useEffect(() => {
    if (currentOrderNumber !== orderNumber) {
      setOrderNumber(currentOrderNumber | 0)
    }
  }, [currentOrderNumber, orderNumber, setOrderNumber])

  const orderDate = !!order && dateTime.format(new Date(order.processedAt))

  return (
    <>
      <Container>
        <Breadcrumb current={`Order ${get(order, 'name')}`} />
      </Container>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box my={2} display="flex" justifyContent="center">
              <Typography variant="h6">
                {!!order ? `Order #${order.orderNumber}` : 'Loading...'}
              </Typography>
            </Box>
          </Grid>
          {!!order && (
            <>
              <Grid item xs={12} sm={12}>
                <Paper elevation={1}>
                  {!!order &&
                    !!order.lineItems &&
                    order.lineItems.edges.map(({ node = {} }, i) => (
                      <OrderDetailsItem key={i} lineItem={node} />
                    ))}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Paper elevation={1}>
                  <List>
                    <ListItem dense button>
                      <ListItemText primary={`Order ${order.name}`} />
                    </ListItem>
                    <ListItem dense button>
                      <ListItemText primary={`Order date: ${orderDate}`} />
                    </ListItem>
                    <ListItem dense button>
                      <ListItemText primary={`Total: ${currency.format(order.totalPrice)}`} />
                    </ListItem>
                  </List>
                  <Button fullWidth color="primary" variant="contained" onClick={handleStatusClick}>
                    Check order status
                    <ChevronRight />
                  </Button>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
        <Box my={4} />
      </Container>
    </>
  )
}

export default withRouter(OrderDetails)
