import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import withMobile from 'shopjs/hocs/withMobile'
import styled from 'styled-components'
import SortIcon from '@material-ui/icons/Sort'
import { theme } from 'components/theme'
import { SelectFilter, PriceFilter, SearchInput } from 'shopjs/components'

const Filters = styled.div`
  margin-bottom: 2rem;
`
const SearchButton = styled(Button)`
  text-transform: uppercase;
  margin-top: 16px !important;
  box-shadow: none !important;
  height: 56px !important;
`
const ButtonGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const FilterButton = styled(Button)`
  margin-top: 10px !important;
  text-transform: uppercase;
`

const StyledSortIcon = styled(SortIcon)`
  margin-left: 10px;
`
const FiltersRow = styled.div`
  border-top: 1px solid ${theme.palette.grey['300']};
  border-bottom: 1px solid ${theme.palette.grey['300']};
  padding: 0.5rem 0;
  margin-top: 1rem;
`

const SearchFilters = ({
  query,
  handleChange,
  handleSearch,
  handleClearClick,
  handleKeyPress,
  selectFilter,
  removeFilter,
  clearFilters,
  location,
  isMobile,
}) => {
  const [showFilter, setToggleFilters] = useState(false)

  return (
    <Filters>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={3}>
          <SearchButton
            fullWidth={!!isMobile}
            onClick={handleSearch}
            color="primary"
            variant="contained"
          >
            SEARCH
          </SearchButton>
        </Grid>
        <ButtonGrid item xs={12} sm={3}>
          <FilterButton
            fullWidth={!!isMobile}
            size="large"
            variant="outlined"
            onClick={() => setToggleFilters(!showFilter)}
          >
            Filter
            <StyledSortIcon />
          </FilterButton>
        </ButtonGrid>
      </Grid>
      {showFilter && (
        <FiltersRow>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={2} md={4}>
              <SelectFilter
                facetName="vendor"
                placeholder="Select brand"
                selectFilter={selectFilter}
                removeFilter={removeFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2} md={4}>
              <SelectFilter
                facetName="product_type"
                placeholder="Select category"
                selectFilter={selectFilter}
                removeFilter={removeFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2} md={4}>
              <SelectFilter
                facetName="options.color"
                placeholder="Select color"
                selectFilter={selectFilter}
                removeFilter={removeFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2} md={4}>
              <SelectFilter
                facetName="options.size"
                placeholder="Select size"
                selectFilter={selectFilter}
                removeFilter={removeFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2} md={4}>
              <PriceFilter
                facetName="price"
                selectFilter={selectFilter}
                removeFilter={removeFilter}
              />
            </Grid>
          </Grid>
        </FiltersRow>
      )}
    </Filters>
  )
}

export default withRouter(withMobile(SearchFilters))
