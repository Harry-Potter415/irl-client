import React from 'react'
import { formatPrice } from 'helpers/orders'
import { Grid, Typography } from '@material-ui/core'
import { DetailsField, CenteredGrid, Image, SmallText, PriceField, ItemTotal } from './style'

const OrderDetails = props => {
  const { order } = props

  const totalPrice = (price, quantity) => {
    const total = { ...price }
    total.amount = (price.amount * quantity).toFixed(2)
    return formatPrice(total)
  }

  if (!order || !order.lineItems) return null

  return (
    <div>
      {order.lineItems.edges.map((edge, index) => {
        const lineItem = edge.node
        const { variant } = lineItem
        const { image } = variant
        const options = variant.selectedOptions
        const formattedOptions = options.map(option => option.value).join(' - ')
        return (
          <DetailsField key={index}>
            <Grid container spacing={2}>
              <CenteredGrid item md={1}>
                {image && <Image src={image.originalSrc} alt={image.altText || 'product image'} />}
              </CenteredGrid>
              <Grid item md={8} xs={12}>
                <Typography variant="body1">{lineItem.title}</Typography>
                <SmallText variant="body1">{formattedOptions}</SmallText>
                {variant.sku && <SmallText variant="body1">{`SKU: ${variant.sku}`}</SmallText>}
              </Grid>

              <CenteredGrid item md={2} xs={8} className="first-column">
                <PriceField>
                  <Typography variant="body1">{formatPrice(variant.priceV2)}</Typography>
                </PriceField>
                <PriceField>
                  <Typography variant="body1">x</Typography>
                </PriceField>
                <PriceField>
                  <Typography variant="body1">{lineItem.quantity}</Typography>
                </PriceField>
              </CenteredGrid>

              <CenteredGrid item md={1} xs={4}>
                <ItemTotal>
                  <Typography variant="body1">
                    {totalPrice(variant.priceV2, lineItem.quantity)}
                  </Typography>
                </ItemTotal>
              </CenteredGrid>
            </Grid>
          </DetailsField>
        )
      })}
    </div>
  )
}

export default OrderDetails
