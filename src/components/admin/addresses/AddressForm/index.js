import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import CheckboxInput from 'components/inputs/CheckboxInput'
import ReactSelect from 'components/inputs/ReactSelect'
import {
  loadAdminUserOptions,
  loadCityOptions,
  buildCityOption,
  buildUserOption,
} from 'helpers/react-select'

class AddressForm extends Component {
  render() {
    let { address, handleChange, errors } = this.props

    return (
      <div>
        <TextInput
          label="Address 1"
          name="address1"
          value={address.address1}
          handleChange={handleChange}
          error={errors.address1}
        />
        <TextInput
          label="Address 2"
          name="address2"
          value={address.address2}
          handleChange={handleChange}
          error={errors.address2}
        />
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={buildCityOption(address.city)}
          hasValue={Boolean(address.city)}
          label="City"
          name="city"
          loadOptions={loadCityOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'city' })
          }}
          error={errors.city}
        />
        <TextInput
          label="State"
          name="state"
          value={address.state}
          handleChange={handleChange}
          error={errors.state}
        />
        <TextInput
          label="Country"
          name="country"
          value={address.country}
          handleChange={handleChange}
          error={errors.country}
        />
        <TextInput
          label="Zipcode"
          name="zipcode"
          value={address.zipcode}
          handleChange={handleChange}
          error={errors.zipcode}
        />
        <CheckboxInput
          name="isIrlOwner"
          label="Extra Owned"
          value={address.isIrlOwner}
          handleChange={handleChange}
          error={errors.isIrlOwner}
        />
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={buildUserOption(address.user)}
          hasValue={Boolean(address.userId)}
          label="User"
          name="userId"
          loadOptions={loadAdminUserOptions}
          handleChange={e => handleChange(e, { reactSelect: true, field: 'userId' })}
          error={errors.userId}
        />
      </div>
    )
  }
}

AddressForm.propTypes = {
  address: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default AddressForm
