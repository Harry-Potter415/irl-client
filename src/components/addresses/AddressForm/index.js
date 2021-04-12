import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import CheckboxInput from 'components/inputs/CheckboxInput'

class AddressForm extends Component {
  render() {
    let { address, handleChange, errors } = this.props
    return (
      <Fragment>
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
          multiline={true}
          handleChange={handleChange}
          error={errors.address2}
        />
        <TextInput
          label="City"
          name="city"
          value={address.city}
          multiline={true}
          handleChange={handleChange}
          error={errors.city}
        />
        <TextInput
          label="State"
          name="state"
          value={address.state}
          multiline={true}
          handleChange={handleChange}
          error={errors.state}
        />
        <TextInput
          label="Country"
          name="country"
          value={address.country}
          multiline={true}
          handleChange={handleChange}
          error={errors.country}
        />
        <TextInput
          label="Zipcode"
          name="zipcode"
          value={address.zipcode}
          multiline={true}
          handleChange={handleChange}
          error={errors.zipcode}
        />
        <CheckboxInput
          label="Primary"
          name="isPrimary"
          value={address.isPrimary}
          handleChange={handleChange}
          error={errors.isPrimary}
        />
      </Fragment>
    )
  }
}

AddressForm.propTypes = {
  address: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default AddressForm
