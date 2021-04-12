import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'

class ProductFilters extends Component {
  render() {
    const { filters, changeFilter } = this.props
    return (
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TextInput
            label="ID"
            name="id"
            value={filters.id}
            handleChange={e => changeFilter('id', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            label="Name"
            name="title"
            value={filters.title}
            handleChange={e => changeFilter('title', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            label="Brand"
            name="brand"
            value={filters.brand}
            handleChange={e => changeFilter('brand', e.target.value)}
          />
        </Grid>
      </Grid>
    )
  }
}

export default ProductFilters
