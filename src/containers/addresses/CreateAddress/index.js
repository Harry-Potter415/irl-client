import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { createAddress } from 'actions/addresses'
import { validateAddress } from 'helpers/validations/address'
import AddressForm from 'components/addresses/AddressForm'
import Form from 'components/layout/Form'

class CreateAddress extends Component {
  render() {
    const { createAddress } = this.props

    return (
      <Form
        resourceName="address"
        title="Create a New Address"
        subtitle="Shipping Locations"
        message="Successfully created address"
        validateFunction={validateAddress}
        action={createAddress}
        saveText="Create"
        callback={() => {
          this.props.history.push('/addresses')
        }}
      >
        {(handleChange, address, errors) => (
          <AddressForm handleChange={handleChange} address={address} errors={errors} />
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createAddress,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(CreateAddress))
