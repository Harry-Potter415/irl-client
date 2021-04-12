import React, { Component, Fragment } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import DatePickerInput from 'components/inputs/DatePickerInput'
import { USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'
import SelectInput from 'components/inputs/SelectInput'
import { theme } from 'components/theme'

const DatePickerGrid = styled(Grid)`
  .MuiOutlinedInput-input {
    padding: 10.5px;
    ::placeholder {
      color: ${theme.palette.grey[600]};
      opacity: 1;
    }
  }
  .close-icon {
    top: 15px;
  }
`

class CampaignFilters extends Component {
  render() {
    const { filters, changeFilter } = this.props
    return (
      <Fragment>
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
            <SelectInput
              name="status"
              label="Status"
              options={USER_CAMPAIGN_DISPLAY_STATUSES}
              value={filters.status}
              includeBlank={true}
              handleChange={e => changeFilter('status', e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <DatePickerGrid item md={3}>
            <DatePickerInput
              value={filters.startDate}
              handleChange={value => {
                changeFilter('startDate', value)
              }}
              placeholder="Start date"
            />
          </DatePickerGrid>
          <DatePickerGrid item md={3}>
            <DatePickerInput
              value={filters.endDate}
              handleChange={value => {
                changeFilter('endDate', value)
              }}
              placeholder="End date"
            />
          </DatePickerGrid>
        </Grid>
      </Fragment>
    )
  }
}

export default CampaignFilters
