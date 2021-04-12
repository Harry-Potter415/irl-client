import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { SearchInput } from 'shopjs/components'
import { Box, Grid } from '@material-ui/core'
import { Placeholder } from 'shopjs/components'
import { algolia } from 'shopjs/services/Algolia'
import { Search } from '@material-ui/icons'
import { SearchStats, ProductHit, SearchPagination } from 'shopjs/components'
import queryString from 'query-string'
import { getVendor } from '../../../helpers'
import { selectCurrentUser } from 'selectors/auth'
import { isAuthorized } from 'helpers/auth'
import { isMobile } from 'helpers/utils'
import Button from '@material-ui/core/Button'

const SearchButton = styled(Button)`
  text-transform: uppercase;
  margin-top: 16px !important;
  box-shadow: none !important;
  height: 56px !important;
`

const SearchList = ({ location, history, currentUser }) => {
  const initialQuery = {
    keywords: '',
    page: 1,
    hitsPerPage: 12,
  }

  const keywords = queryString.parse(location.search).keywords

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState(initialQuery)
  const [nbPages, setNbPages] = useState(0)
  const [nbHits, setNbHits] = useState(0)

  const handleSearch = () => {
    const newQuery = {
      ...query,
      page: 1,
    }
    setQuery(newQuery)
    searchProducts(newQuery)
  }

  const searchProducts = async query => {
    if (!currentUser) return

    const {
      id,
      attributes: { company },
    } = currentUser

    algolia.clearCache()
    const results = await algolia.search(query.keywords, {
      facetFilters: [[`vendor:${company}`, `vendor:${id}`]],
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
    }
  }

  const handleClearClick = () => {
    const newQuery = {
      ...query,
      keywords: '',
      page: 1,
    }
    setQuery(newQuery)
    searchProducts(newQuery)
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
    let newQuery = initialQuery
    if (keywords) {
      newQuery = {
        ...query,
        keywords: keywords,
      }
    }
    setQuery(newQuery)
    searchProducts(newQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, currentUser])

  const isLoaded = !!products && products.length > 0

  return (
    <Box p={0} m={0}>
      <Grid container spacing={0}>
        {isAuthorized(currentUser, 'create', 'products') && (
          <Grid item sm={2} style={{ marginRight: 20 }}>
            <SearchButton
              fullWidth={!!isMobile}
              onClick={() => history.push('/products/new')}
              color="primary"
              variant="contained"
            >
              New Product
            </SearchButton>
          </Grid>
        )}
        <Grid item xs={11} sm={6}>
          <SearchInput
            label="Search"
            name="keywords"
            margin="normal"
            placeholder="Search products ..."
            value={query.keywords}
            onKeyPress={handleKeyPress}
            handleChange={handleChange}
            handleClearClick={handleClearClick}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <SearchButton
            fullWidth={!!isMobile}
            onClick={handleSearch}
            color="primary"
            variant="contained"
          >
            Search
          </SearchButton>
        </Grid>
      </Grid>
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

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(withRouter(SearchList))
