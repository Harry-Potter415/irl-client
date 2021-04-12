import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { Breadcrumb, Placeholder } from 'shopjs/components'
import { CartSummary, CheckoutButton, LineItems } from 'shopjs/components'
import { Paper, Typography, Box, Grid } from '@material-ui/core'
import CartIcon from 'icons/CartIcon'

const CartList = () => {
  const {
    cart: { checkout },
  } = useContext(ShopifyContext)

  const itemsInCart = checkout && checkout.lineItems.length > 0

  return (
    <>
      <Breadcrumb current="Cart" />
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Box m={2}>
            <Typography variant="h5">My Cart</Typography>
          </Box>
        </Grid>
        {itemsInCart ? (
          <>
            <Grid item xs={12} sm={8}>
              <Box m={2}>
                <Paper elevation={1}>
                  <LineItems />
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box m={2}>
                <Paper elevation={1}>
                  <Box display="flex" justifyContent="center" pt={2}>
                    <Typography variant="caption">Order Summary</Typography>
                  </Box>
                  <CartSummary />
                  <CheckoutButton />
                </Paper>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Placeholder icon={<CartIcon />} title="Empty cart" subtitle="No items in your cart" />
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default CartList
