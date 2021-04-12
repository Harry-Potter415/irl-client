import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useCollection } from 'shopjs/hooks'
import { Helmet } from 'react-helmet'
import { Box, Grid } from '@material-ui/core'
import {
  Placeholder,
  Breadcrumb,
  SearchStats,
  ProductHit,
  SearchPagination,
} from 'shopjs/components'
import { Search } from '@material-ui/icons'
import { algolia } from 'shopjs/services/Algolia'
import { animateScroll } from 'react-scroll'

const CollectionList = ({ match }) => {
  const { collectionHandle } = match.params

  const hitsPerPage = 48
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [nbPages, setNbPages] = useState(0)
  const [nbHits, setNbHits] = useState(0)

  const { collection } = useCollection({ collectionHandle })

  const searchProducts = useCallback(
    async page => {
      const results = await algolia.search('', {
        facetFilters: [`collections: ${collectionHandle}`],
        page: page - 1,
        hitsPerPage: hitsPerPage,
      })
      const { hits, nbHits, nbPages } = results
      setProducts(hits)
      setNbPages(nbPages)
      setNbHits(nbHits)
      animateScroll.scrollToTop()
    },
    [collectionHandle, hitsPerPage, setProducts, setNbPages, setNbHits]
  )

  const handleRefine = page => {
    setPage(page)
    searchProducts(page)
  }

  useEffect(() => {
    searchProducts(1)
  }, [searchProducts])

  const isLoaded = !!products

  return (
    <Box>
      {!!collection && (
        <Helmet>
          <title>{collection.title}</title>
        </Helmet>
      )}

      {collectionHandle && <Breadcrumb labelReplacement={{ collectionHandle }} />}
      <Box display="flex" mt={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SearchStats currentPage={page} hitsPerPage={hitsPerPage} nbHits={nbHits} />
          </Grid>

          {isLoaded &&
            products.map((product, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <ProductHit product={product} />
              </Grid>
            ))}

          {isLoaded && products.length === 0 && (
            <Box display="flex" flexDirection="row" justifyContent="center" width="100%">
              <Placeholder
                icon={<Search />}
                title="Empty collection"
                subtitle="No products in this collection"
              />
            </Box>
          )}

          {isLoaded && (
            <Grid item xs={12}>
              <SearchPagination nbPages={nbPages} currentPage={page} refine={handleRefine} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default withRouter(CollectionList)
