import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { get } from 'shopjs/helpers'
import { Image } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'
import { StyledBox } from './styles'

const LineItem = ({ lineItem, classes, history }) => {
  // Use the guest context
  const {
    formatters: { currency },
  } = useContext(ShopifyContext)

  const itemQuantity = get(lineItem, 'quantity')
  const itemPrice = currency.format(get(lineItem, 'variant.price') * itemQuantity)

  const handleClick = productHandle => {
    history.push(`/shop/products/${productHandle}`)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={3}>
        <Image
          onClick={() => handleClick(lineItem.variant.product.handle)}
          width="100%"
          height={140}
          imageUrl={lineItem.variant.image.src}
          title={`${lineItem.title} product shot`}
        />
      </Grid>
      <Grid item xs={8} sm={7}>
        <StyledBox m={1} display="flex" flexDirection="column">
          <Typography variant="body1">{lineItem.title}</Typography>
          {lineItem.variant.selectedOptions.map(option => (
            <Typography key={`${option.name}-${option.value}`} variant="caption">
              {option.name}: {option.value}
            </Typography>
          ))}
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
        </Box>
      </Grid>
    </Grid>
  )
}

export default withRouter(LineItem)
