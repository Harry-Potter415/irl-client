import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { get } from 'shopjs/helpers'
import { Image, QuantityControl } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'
import { RemoveButton, StyledBox } from './styles'
import _ from 'lodash'
import { IGNORE_SHOPIFY_OPTIONS, SHOPIFY_OPTIONS } from 'lib/constants'

const LineItem = ({ lineItem, classes, history }) => {
  // Use the guest context
  const {
    formatters: { currency },
    cart: { updateLineItem, removeLineItem, handleCloseCart },
  } = useContext(ShopifyContext)

  const selectedOptions = get(lineItem, 'variant.selectedOptions')
  const minOrder =
    selectedOptions && selectedOptions.find(option => option.name === SHOPIFY_OPTIONS.minimumOrder)
  const casePack =
    selectedOptions && selectedOptions.find(option => option.name === SHOPIFY_OPTIONS.casePack)
  const itemQuantity = get(lineItem, 'quantity')
  const itemPrice = currency.format(get(lineItem, 'variant.price') * itemQuantity)
  const step = parseInt(casePack.value)

  const updateItemQuantity = value => updateLineItem(lineItem.id, lineItem.variant.id, value)
  const removeItem = () => removeLineItem(lineItem)

  const handleClick = productHandle => {
    handleCloseCart()
    history.push(`/shop/products/${productHandle}`)
  }

  const isLoaded =
    _.get(lineItem, 'variant.product.handle') && _.get(lineItem, 'variant.image.src') ? true : false
  return (
    <>
      {isLoaded ? (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4}>
            <Image
              onClick={() => handleClick(lineItem.variant.product.handle)}
              width="100%"
              height={140}
              imageUrl={lineItem.variant.image.src}
              title={`${lineItem.title} product shot`}
            />
          </Grid>
          <Grid item xs={8} sm={6}>
            <StyledBox m={1} display="flex" flexDirection="column" justifyContent="space-between">
              <Typography variant="body1">{lineItem.title}</Typography>
              {lineItem.variant.selectedOptions.map(
                option =>
                  !IGNORE_SHOPIFY_OPTIONS.includes(option.name) && (
                    <Typography key={`${option.name}-${option.value}`} variant="caption">
                      {option.name}: {option.value}
                    </Typography>
                  )
              )}
              <Box mb={1} display="flex" flexDirection="row" justifyContent="space-between">
                {casePack ? (
                  <QuantityControl
                    label
                    debounced
                    buttons={false}
                    float="left"
                    onChange={updateItemQuantity}
                    min={0}
                    step={step}
                    value={itemQuantity}
                  />
                ) : (
                  <QuantityControl
                    label
                    debounced
                    buttons={false}
                    float="left"
                    onChange={updateItemQuantity}
                    min={0}
                    value={itemQuantity}
                  />
                )}
              </Box>
            </StyledBox>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Box
              p={1}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="space-between"
              height="100%"
            >
              <Typography variant="body1">{itemPrice}</Typography>
              <RemoveButton size="small" onClick={e => removeItem(lineItem)}>
                Remove
              </RemoveButton>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </>
  )
}

export default withRouter(LineItem)
