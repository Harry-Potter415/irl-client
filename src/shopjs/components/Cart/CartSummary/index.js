import React, { useContext, useState } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { TextField, Box, Button, withStyles, List, ListItem, ListItemText } from '@material-ui/core'

const styles = theme => ({
  input: {
    width: '200px',
  },
})

const CartSummary = ({ history, classes, onRouteChange }) => {
  const {
    cart: { checkout, applyPromoCode, totalTax, totalPrice, discount, subtotalPrice },
  } = useContext(ShopifyContext)
  const [promoCode, setPromoCode] = useState('')

  const handleApplyPromoCode = async () => {
    await applyPromoCode(promoCode)
    setPromoCode('')
  }

  return (
    <Box>
      <List>
        <ListItem dense button>
          <ListItemText primary={`Subtotal: ${subtotalPrice}`} />
        </ListItem>
        <ListItem dense button>
          <ListItemText primary={`Taxes: ${totalTax}`} />
        </ListItem>
        {!!discount && (
          <ListItem dense button>
            <ListItemText primary={`Discount: -${discount}`} />
          </ListItem>
        )}
        {checkout &&
          checkout.discountApplications &&
          checkout.discountApplications.map(promo => (
            <ListItem dense button key={promo.code}>
              <ListItemText primary={`Promo code: ${promo.code}`} />
            </ListItem>
          ))}
        <ListItem dense button>
          <ListItemText primary={`Total: ${totalPrice}`} />
        </ListItem>
      </List>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" alignItems="flex-end" m={2}>
          <TextField
            margin="dense"
            fullWidth
            label="Promo code"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
          />
          <Button fullWidth disabled={!promoCode} onClick={handleApplyPromoCode}>
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withStyles(styles)(CartSummary)
