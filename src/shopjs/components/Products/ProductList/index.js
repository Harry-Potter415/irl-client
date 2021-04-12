import React, { Fragment } from 'react'
import { ProductItem } from 'shopjs/components'
import { Waypoint } from 'react-waypoint'
import { withStyles, Box, Grid } from '@material-ui/core'

const styles = () => ({
  product: {
    flexGrow: 1,
  },
})

const ProductList = ({ classes, pages, hasNextPage, getNextPage, detailsUrl }) => {
  return (
    <Box>
      {pages && !!pages.length && (
        <Grid container spacing={1} justify="flex-start">
          {pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.map((product, productIndex) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductItem
                    className={classes.product}
                    product={product}
                    detailsUrl={detailsUrl}
                  />
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      )}
      <Waypoint onEnter={getNextPage} />
    </Box>
  )
}

export default withStyles(styles)(ProductList)
