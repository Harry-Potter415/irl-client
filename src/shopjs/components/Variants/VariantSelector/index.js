import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { ShopifyContext } from 'shopjs/context'
import { OptionSelector, QuantityControl, DropdownQuantityControl } from 'shopjs/components'
import { Grid, Box, Typography } from '@material-ui/core'
import { AddToCartButton } from 'shopjs/components'
import { SHOPIFY_OPTIONS } from 'lib/constants'
import { selectCurrentUser } from 'selectors/auth'

const VariantSelector = ({
  variant,
  productHandle,
  options,
  selectOption,
  selectedOptions,
  currentUser,
}) => {
  const {
    formatters: { currency },
  } = useContext(ShopifyContext)
  const minOrder = selectedOptions[SHOPIFY_OPTIONS.minimumOrder]
  const casePack = selectedOptions[SHOPIFY_OPTIONS.casePack]
  const [quantity, setQuantity] = useState(1)

  return (
    <form>
      <Grid container spacing={12}>
        {!!options && !!options.length > 0 && (
          <Grid item xs={12}>
            {options.map((option, i) => (
              <Box my={3} key={i}>
                <OptionSelector
                  option={option}
                  selectedOptions={selectedOptions}
                  selectOption={selectOption}
                />
              </Box>
            ))}
          </Grid>
        )}
        {casePack && (
          <Grid item xs={12}>
            <Typography color="textSecondary">{`Case Pack: ${casePack}`}</Typography>
          </Grid>
        )}
        {minOrder && currentUser && (
          <Grid item xs={12}>
            <Typography color="textSecondary">{`Minimum Order: ${currency.format(
              minOrder
            )}`}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box my={2}>
            {casePack ? (
              <DropdownQuantityControl
                onChange={setQuantity}
                value={quantity}
                casePack={casePack}
                minOrder={minOrder}
                price={variant.price}
              />
            ) : (
              <QuantityControl onChange={setQuantity} value={quantity} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box my={2}>
            <AddToCartButton variant={variant} quantity={quantity} productHandle={productHandle} />
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(VariantSelector)
