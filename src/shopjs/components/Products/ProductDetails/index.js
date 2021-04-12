import React, { Fragment } from 'react'
import Sticky from 'react-sticky-fill'
import { Helmet } from 'react-helmet'
import { Typography, Box, Grid } from '@material-ui/core'
import { VariantSelector, ProductImages, Price } from 'shopjs/components'
import { formatCurrency } from 'shopjs/helpers/utils'
import { ShareButtons } from 'shopjs/components'
import { BrandName, PriceContainer } from './styles'

const ProductDetails = ({ product, variant, visibleImages, selectedOptions, selectOption }) => {
  const price = variant && variant.price && formatCurrency(variant.price)
  const compareAtPrice = variant && variant.compareAtPrice && formatCurrency(variant.compareAtPrice)
  const currentUrl = window.location.hash

  const filterDescription = description => description.replace(/~.*~/g, '')

  return (
    <Fragment>
      {!!product.title && !!product.name && (
        <Helmet>
          <title>
            {product.title}&nbsp;|&nbsp;{product.name}
          </title>
        </Helmet>
      )}
      <Grid container spacing={12} justify="center">
        <Grid item xs={12} sm={6} md={6}>
          <ProductImages visibleImages={visibleImages} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Sticky>
            <Box mx={2} my={1}>
              <BrandName>{product.vendor}</BrandName>
              <Typography variant="h4">{product.title}</Typography>

              <PriceContainer>
                <Price price={price} compareAtPrice={compareAtPrice} />
              </PriceContainer>

              <VariantSelector
                variant={variant}
                options={product.options}
                selectOption={selectOption}
                selectedOptions={selectedOptions}
                productHandle={product.handle}
              />

              <Typography variant="body1">
                {product.descriptionHtml !== null && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: filterDescription(product.descriptionHtml),
                    }}
                  />
                )}
              </Typography>
              <ShareButtons url={currentUrl} title={product.title} />
            </Box>
          </Sticky>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ProductDetails
