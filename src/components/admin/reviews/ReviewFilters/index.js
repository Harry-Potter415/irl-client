import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadAdminProductOptions } from 'helpers/react-select'
import styled from 'styled-components'

const ReactSelectGrid = styled(Grid)`
  position: relative;
  top: 2px;
`

class ReviewFilters extends Component {
  render() {
    const { filters, changeFilter, productFilter } = this.props
    return (
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TextInput
            label="Name or Email"
            name="nameOrEmail"
            value={filters.nameOrEmail}
            handleChange={e => changeFilter('nameOrEmail', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            label="Comment"
            name="comment"
            value={filters.comment}
            handleChange={e => changeFilter('comment', e.target.value)}
          />
        </Grid>
        {productFilter && (
          <ReactSelectGrid item md={2}>
            <ReactSelect
              onChange={this.handleChange}
              hasValue={Boolean(filters.reviewProductId)}
              label="Product"
              name="product"
              loadOptions={loadAdminProductOptions}
              handleChange={e => changeFilter('reviewProductId', e && e.value)}
            />
          </ReactSelectGrid>
        )}
        <Grid item md={2}>
          <TextInput
            label="Rating"
            name="ratingGt"
            value={filters.ratingGt}
            handleChange={e => changeFilter('ratingGt', e.target.value)}
          />
        </Grid>
      </Grid>
    )
  }
}

ReviewFilters.defaultProps = {
  productFilter: true,
}

export default ReviewFilters
