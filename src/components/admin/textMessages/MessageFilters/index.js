import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'

class MessageFilters extends Component {
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
            label="Phone"
            name="phone_number"
            value={filters.phone_number}
            handleChange={e => changeFilter('phone_number', e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <TextInput
            label="Message"
            name="message"
            value={filters.message}
            handleChange={e => changeFilter('message', e.target.value)}
          />
        </Grid>
      </Grid>
    )
  }
}

export default MessageFilters
