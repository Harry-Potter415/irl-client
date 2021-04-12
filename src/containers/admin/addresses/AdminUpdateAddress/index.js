import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getAddress, updateAddress } from 'actions/admin/addresses'
import { validateAddress } from 'helpers/validations/address'
import { isLoaded } from 'helpers/components'
import { selectAddress } from 'selectors/admin/addresses'
import Form from 'components/layout/Form'
import AddressForm from 'components/admin/addresses/AddressForm'

class AdminUpdateAddress extends Component {
  componentDidMount() {
    const { getAddress } = this.props
    const { id } = this.props.match.params
    getAddress(id)
  }

  render() {
    const { address, updateAddress } = this.props
    if (!isLoaded(address)) return null

    return (
      <Form
        initialValues={address}
        resourceName="address"
        title="Edit Address"
        message="Successfully updated address"
        validateFunction={validateAddress}
        action={updateAddress}
        saveText="Update"
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
      getAddress,
      updateAddress,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const address = selectAddress(state, id)
  return {
    address,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminUpdateAddress)))
