import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { Button } from '@material-ui/core'
import _ from 'lodash'

const CheckoutButton = props => {
  const {
    cart: { checkout },
    events: { dispatch },
  } = useContext(ShopifyContext)

  const handleCheckoutClick = async () => {
    const checkoutUrl = _.get(checkout, 'webUrl')
    dispatch('navigatedToCheckout')
    window.location = checkoutUrl
  }

  return (
    <Button fullWidth color="primary" variant="contained" onClick={e => handleCheckoutClick()}>
      Checkout
    </Button>
  )
}

export default CheckoutButton
