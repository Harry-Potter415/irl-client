import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createAddress } from 'actions/admin/addresses'
import { validateAddress } from 'helpers/validations/address'
import Form from 'components/layout/Form'
import AddressForm from 'components/admin/addresses/AddressForm'

class AdminCreateAddress extends Component {
  render() {
    const { createAddress } = this.props

    return (
      <Form
        resourceName="address"
        title="Create a New Address"
        message="Successfully created address"
        validateFunction={validateAddress}
        action={createAddress}
        saveText="Create"
        callback={() => {
          this.props.history.push('/admin/addresses')
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
)(withRouter(withAlerts(AdminCreateAddress)))
