import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { LineItem } from 'shopjs/components'
import { Typography, Box, withStyles } from '@material-ui/core'

const styles = () => ({
  input: {
    width: '200px',
  },
})

const LineItems = ({ handleCartToggle, history, classes }) => {
  const {
    cart: { checkout },
  } = useContext(ShopifyContext)

  return (
    <Box>
      {checkout && checkout.lineItems ? (
        checkout.lineItems.map(lineItem => {
          return (
            <LineItem key={lineItem.id} handleCartToggle={handleCartToggle} lineItem={lineItem} />
          )
        })
      ) : (
        <Typography>Your cart is empty</Typography>
      )}
    </Box>
  )
}

export default withStyles(styles)(LineItems)
