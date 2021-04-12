import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { Badge } from '@material-ui/core'
import { StyledIconButton } from './styles'
import CartIcon from 'icons/CartIcon'

const CartToggleButton = props => {
  const {
    cart: { handleToggleCart, totalLineItems },
  } = useContext(ShopifyContext)

  return (
    <StyledIconButton component="button" onClick={handleToggleCart} aria-label="Open Cart">
      {totalLineItems > 0 ? (
        <Badge badgeContent={totalLineItems} color="secondary">
          <CartIcon />
        </Badge>
      ) : (
        <CartIcon />
      )}
    </StyledIconButton>
  )
}

export default CartToggleButton
