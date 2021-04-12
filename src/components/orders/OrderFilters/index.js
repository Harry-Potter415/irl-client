import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'
import { USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import SelectInput from 'components/inputs/SelectInput'

class OrderFilters extends Component {
  render() {
    const { filters, changeFilters } = this.props
    return (
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TextInput
            label="Product Name"
            name="productName"
            value={filters.productName}
            handleChange={e => changeFilters({ ...filters, productName: e.target.value })}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            label="Product Type"
            name="productType"
            value={filters.productType}
            handleChange={e => changeFilters({ ...filters, productType: e.target.value })}
          />
        </Grid>
        <Grid item md={2}>
          <TextInput
            label="Order #"
            name="orderNumber"
            value={filters.orderNumber}
            handleChange={e => changeFilters({ ...filters, orderNumber: e.target.value })}
          />
        </Grid>
        <Grid item md={2}>
          <SelectInput
            name="status"
            label="Status"
            options={USER_CAMPAIGN_DISPLAY_STATUSES}
            value={filters.status}
            includeBlank={true}
            handleChange={e => changeFilters({ ...filters, status: e.target.value })}
          />
        </Grid>
      </Grid>
    )
  }
}

export default OrderFilters
