import React from 'react'
import { withRouter } from 'react-router-dom'
import { StyledCard } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Fade, CardContent, CardMedia, CardActionArea } from '@material-ui/core'
import { Badge, Price } from 'shopjs/components'
import CustomHighlight from 'shopjs/components/Search/Highlight'
import { formatCurrency } from 'shopjs/helpers/utils'
import { BrandName } from 'shopjs/components/Products/ProductDetails/styles'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '340px',
  },
  media: {
    height: '240px',
  },
}))

const ProductHit = ({ product, className, history }) => {
  const classes = useStyles()

  const handleClick = () => {
    history.push(`/shop/products/${product.handle}`)
  }

  const { inventory_quantity, compare_at_price } = product
  const soldOut = inventory_quantity === 0
  const compareAtPrice = compare_at_price

  return (
    <Fade in>
      {product && (
        <StyledCard square className={className} elevation={0}>
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              component="img"
              image={product.product_image}
              title={product.title}
            />
            {soldOut && <Badge label="Sold Out" />}
          </CardActionArea>
          <CardContent>
            <Box display="flex" flexWrap="wrap">
              <Box flexGrow={1}>
                <BrandName isSmall>{product.vendor}</BrandName>
                {/* TODO: adapt the vendor to work with algolia search then reinstate the highlight
                <CustomHighlight variant="subtitle2" hit={product} attribute="vendor" />
                */}
                <CustomHighlight variant="body1" hit={product} attribute="title" />
                <Price
                  price={formatCurrency(product.price)}
                  compareAtPrice={formatCurrency(compareAtPrice)}
                />
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      )}
    </Fade>
  )
}

export default withRouter(ProductHit)
