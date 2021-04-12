import React, { useContext } from 'react'
import { CartSummary, CheckoutButton, LineItems, Placeholder } from 'shopjs/components'
import { Button, Divider, IconButton, Typography, Drawer, Box } from '@material-ui/core'
import { withMobile } from 'shopjs/hocs'
import { Close, ArrowBack } from '@material-ui/icons'
import { StyledList } from './styles'
import { ShopifyContext } from 'shopjs/context'
import CartIcon from 'icons/CartIcon'

const CartDrawer = ({ isMobile }) => {
  const {
    cart: { checkout, cartOpen, clearCart, handleToggleCart },
  } = useContext(ShopifyContext)
  const itemsInCart = checkout && checkout.lineItems.length > 0

  return (
    <Drawer anchor="right" open={cartOpen} onClose={handleToggleCart}>
      <StyledList mobile={isMobile || undefined}>
        <Box m={1} display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <IconButton onClick={handleToggleCart}>
              <ArrowBack />
            </IconButton>
          </Box>
          <Box m={1}>
            <Typography variant="h6">Cart</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleToggleCart}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {itemsInCart ? (
          <Box>
            <LineItems handleCartToggle={handleToggleCart} />
            <CartSummary />
            <Box m={2}>
              <CheckoutButton />
            </Box>
          </Box>
        ) : (
          <Placeholder icon={<CartIcon />} title="Empty cart" subtitle="No items in your cart" />
        )}
      </StyledList>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="bottom"
        justifyContent="flex-end"
      >
        <Button size="small" onClick={clearCart}>
          Clear cart
        </Button>
      </Box>
    </Drawer>
  )
}

export default withMobile(CartDrawer)
