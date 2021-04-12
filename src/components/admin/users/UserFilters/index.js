import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import TextInput from 'components/inputs/TextInput'
import { USER_TYPE_OPTIONS, SIGNUP_OPTIONS } from 'lib/constants'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadCityOptions } from 'helpers/react-select'
import Sync from 'react-select'
import Slider from 'components/inputs/Slider'

class UserFilters extends Component {
  render() {
    const { filters, changeFilter } = this.props
    return (
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TextInput
            value={filters.name}
            label="Name"
            handleChange={e => changeFilter('name', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            value={filters.email}
            label="Email"
            handleChange={e => changeFilter('email', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            value={filters.company}
            label="Company"
            handleChange={e => changeFilter('company', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <ReactSelect
            label="User Type"
            name="userType"
            options={Object.keys(USER_TYPE_OPTIONS).map(key => {
              return { value: key, label: USER_TYPE_OPTIONS[key] }
            })}
            SelectComponent={Sync}
            hasValue={Boolean(filters.userType)}
            handleChange={e => {
              changeFilter('userType', e && e.value)
            }}
          />
        </Grid>
        <Grid item md={3}>
          <ReactSelect
            hasValue={Boolean(filters.city)}
            label="City"
            name="city"
            loadOptions={loadCityOptions}
            handleChange={e => {
              changeFilter('city', e && e.value)
            }}
          />
        </Grid>
        <Grid item md={3}>
          <ReactSelect
            label="Audience"
            name="audience"
            options={SIGNUP_OPTIONS.audiences}
            SelectComponent={Sync}
            hasValue={Boolean(filters.audience)}
            handleChange={e => {
              changeFilter('audience', e && e.value)
            }}
          />
        </Grid>
        <Grid item md={3}>
          <ReactSelect
            label="Age Group"
            name="ageGroup"
            options={SIGNUP_OPTIONS.ageGroups}
            SelectComponent={Sync}
            hasValue={Boolean(filters.ageGroup)}
            handleChange={e => {
              changeFilter('ageGroup', e && e.value)
            }}
          />
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}>
          <Slider
            value={filters.rooms}
            onChange={(e, val) => changeFilter('rooms', val)}
            valueLabelDisplay="auto"
            label="Rooms"
            max={1000}
          />
        </Grid>
      </Grid>
    )
  }
}

export default UserFilters
