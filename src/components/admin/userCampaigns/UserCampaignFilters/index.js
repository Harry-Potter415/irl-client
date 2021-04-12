import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadAdminCampaignOptions } from 'helpers/react-select'
import styled from 'styled-components'
import { USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import SelectInput from 'components/inputs/SelectInput'

const ReactSelectGrid = styled(Grid)`
  position: relative;
  top: 2px;
`

class UserCampaignFilters extends Component {
  render() {
    const { filters, changeFilters } = this.props
    return (
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TextInput
            label="Order #"
            name="orderNumber"
            value={filters.orderNumber}
            handleChange={e => changeFilters({ ...filters, orderNumber: e.target.value })}
          />
        </Grid>
        <ReactSelectGrid item md={3}>
          <ReactSelect
            onChange={this.handleChange}
            hasValue={Boolean(filters.campaignId)}
            label="Placement"
            name="campaign"
            loadOptions={loadAdminCampaignOptions}
            handleChange={e => changeFilters({ ...filters, campaignId: e && e.value })}
          />
        </ReactSelectGrid>
        <Grid item md={2}>
          <TextInput
            label="Host"
            name="host"
            value={filters.host}
            handleChange={e => changeFilters({ ...filters, host: e.target.value })}
          />
        </Grid>
        <Grid item md={2}>
          <TextInput
            label="Company"
            name="company"
            value={filters.company}
            handleChange={e => changeFilters({ ...filters, company: e.target.value })}
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

export default UserCampaignFilters
