import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { withRouter } from 'react-router-dom'
import { StyledCard } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import NoImage from 'shopjs/resources/images/image.svg'
import { Box, Zoom, Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core'
import { Badge, ColorSelector, Price } from 'shopjs/components'
import { useProduct } from 'shopjs/hooks'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '340px',
  },
  media: {
    height: '240px',
  },
  vendor: {
    fontSize: 11,
    letterSpacing: 0.11,
    textTransform: 'uppercase',
  },
}))

const ProductItem = props => {
  const { className, detailsUrl = '', history } = props

  const [{ product, variant, selectedOptions }, { selectOption }] = useProduct({
    product: props.product,
    productHandle: props.product.handle,
  })

  const classes = useStyles()
  const {
    formatters: { currency },
  } = useContext(ShopifyContext)

  const itemPrice = currency.format(variant.price)
  const compareAtPrice = currency.format(variant.compareAtPrice)

  const handleClick = () => {
    detailsUrl
      ? history.push(`${detailsUrl}/products/${product.handle}`)
      : history.push(`/shop/products/${product.handle}`)
  }

  let colorOptions = product && product.options && product.options.find(o => o.name === 'Color')

  return (
    <Zoom in={true}>
      {product && variant && (
        <StyledCard square className={className} elevation={0}>
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              component="img"
              image={variant.imageUrl ? variant.imageUrl : NoImage}
              title={product.title}
            />
            {!variant.available && <Badge label="Sold Out" />}
          </CardActionArea>
          <CardContent>
            <Box mb={1}>
              <ColorSelector
                option={colorOptions}
                selectedOptions={selectedOptions}
                selectOption={selectOption}
              />
            </Box>
            <Box className={classes.vendor}>{product.vendor}</Box>
            <Box display="flex" flexWrap="wrap">
              <Box flexGrow={1}>
                <Typography>{product.title}</Typography>
              </Box>
            </Box>
            <Price price={itemPrice} compareAtPrice={compareAtPrice} />
          </CardContent>
        </StyledCard>
      )}
    </Zoom>
  )
}

export default withRouter(ProductItem)
