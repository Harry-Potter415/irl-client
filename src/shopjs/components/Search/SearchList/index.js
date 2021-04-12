import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { SearchFilters } from 'shopjs/components'
import { Box, Grid } from '@material-ui/core'
import { Placeholder } from 'shopjs/components'
import { algolia } from 'shopjs/services/Algolia'
import { Search } from '@material-ui/icons'
import { SearchStats, ProductHit, SearchPagination } from 'shopjs/components'
import queryString from 'query-string'
import HeroImage from 'components/layout/HeroImage'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { theme } from 'components/theme'
import { getVendor } from '../../../helpers'

const HeroImageText = styled(Typography)`
  && {
    color: #fff;
    font-size: 72px;
    min-height: 203px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${theme.breakpoints.down('sm')} {
      min-height: 140px;
    }
  }
`

const SearchList = props => {
  const initialQuery = {
    keywords: '',
    filters: {},
    page: 1,
    hitsPerPage: 12,
  }

  const keywords = queryString.parse(props.location.search).keywords

  const [products, setProducts] = useState([])
  let [query, setQuery] = useState(initialQuery)
  const [nbPages, setNbPages] = useState(0)
  const [nbHits, setNbHits] = useState(0)

  const initQuery = () => {
    let newQuery = initialQuery
    if (keywords) {
      newQuery = {
        ...query,
        keywords: keywords,
      }
    }
    setQuery(newQuery)
    searchProducts(newQuery)
  }

  const handleSearch = () => {
    query = {
      ...query,
      page: 1,
    }
    setQuery(query)
    searchProducts(query)
  }

  const searchProducts = async query => {
    let { filters } = query
    let filtersArr = []
    Object.keys(filters).map(filter => filtersArr.push(`${filter}:${filters[filter]}`))

    const results = await algolia.search(query.keywords, {
      facetFilters: filtersArr,
      filters: `(NOT product_type: Placement) AND (NOT product_type: Retail)`,
      page: query.page - 1,
      hitsPerPage: query.hitsPerPage,
    })
    if (results) {
      let { hits, nbHits, nbPages } = results
      hits = await Promise.all(hits.map(async hit => ({ ...hit, vendor: await getVendor(hit) })))
      setProducts(hits)
      setNbPages(nbPages)
      setNbHits(nbHits)
      props.history.push(`/shop/search?keywords=${query.keywords}`)
    }
  }

  const handleClearClick = () => {
    query = {
      ...query,
      keywords: '',
      page: 1,
    }
    setQuery(query)
    searchProducts(query)
  }

  const selectFilter = (facetName, value) => {
    query.filters = {
      ...query.filters,
      [facetName]: value,
    }
    setQuery(query)
    searchProducts(query)
  }

  const removeFilter = filterName => {
    delete query.filters[filterName]
    setQuery(query)
    searchProducts(query)
  }

  const clearFilters = () => {
    setQuery({
      ...query,
      filters: {},
    })
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    const newQuery = {
      ...query,
      [name]: value,
    }
    setQuery(newQuery)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleRefine = page => {
    const newQuery = {
      ...query,
      page: parseInt(page),
    }
    setQuery(newQuery)
    searchProducts(newQuery)
  }

  useEffect(() => {
    initQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords])

  const isLoaded = !!products && products.length > 0

  return (
    <Box p={0} m={0}>
      <HeroImage
        url="assets-images/shop_cover.png"
        darken={0.1}
        style={{ marginLeft: -68, marginTop: -30, width: 'calc(100% + 136px)' }}
      >
        <HeroImageText variant="h1">Shop</HeroImageText>
      </HeroImage>
      <SearchFilters
        query={query}
        handleKeyPress={handleKeyPress}
        handleChange={handleChange}
        handleSearch={handleSearch}
        removeFilter={removeFilter}
        selectFilter={selectFilter}
        clearFilters={clearFilters}
        handleClearClick={handleClearClick}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SearchStats currentPage={query.page} hitsPerPage={query.hitsPerPage} nbHits={nbHits} />
        </Grid>
        {isLoaded &&
          products.map((product, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <ProductHit product={product} />
            </Grid>
          ))}
        {(!products || products.length === 0) && (
          <Box display="flex" flexDirection="row" justifyContent="center" width="100%">
            <Placeholder icon={<Search />} title="No results" subtitle="Please try another query" />
          </Box>
        )}

        {isLoaded && (
          <Grid item xs={12}>
            <SearchPagination nbPages={nbPages} currentPage={query.page} refine={handleRefine} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default withRouter(SearchList)
