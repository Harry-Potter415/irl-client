import React from 'react'
import { Grid } from '@material-ui/core'
import { CollectionItem } from 'shopjs/components'

const COLLECTIONS = ['snacks', 'shop-by-bath', 'living-room', 'drinks', 'wellness', 'accessories']

const CollectionList = ({ classes }) => {
  return (
    <Grid container spacing={1}>
      {COLLECTIONS.map((collection, i) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
          <CollectionItem collectionHandle={collection} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CollectionList
