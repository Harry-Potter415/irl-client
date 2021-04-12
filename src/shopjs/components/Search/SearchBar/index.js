import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Grid, Button } from '@material-ui/core'
import { SearchInput } from 'shopjs/components'
import styled from 'styled-components'

const SearchButton = styled(Button)`
  margin-top: 16px !important;
  padding: 15px 20px !important;
`

const SearchBar = ({ history }) => {
  const [query, setQuery] = useState('')

  const handleChange = ev => {
    let { value } = ev.target
    setQuery(value)
  }

  const handleSearch = () => {
    history.push(`/shop/search?keywords=${query}`)
  }

  const handleClearClick = () => {
    setQuery('')
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={0}>
        <Grid item xs={12} sm={9}>
          <SearchInput
            fullWidth
            variant="outlined"
            name="keywords"
            onKeyPress={handleKeyPress}
            placeholder="Search ..."
            value={query}
            handleChange={handleChange}
            handleClearClick={handleClearClick}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SearchButton
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSearch}
          >
            Search
          </SearchButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withRouter(SearchBar)
