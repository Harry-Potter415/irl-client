import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createAddress } from 'actions/addresses'
import { validateAddress } from 'helpers/validations/address'
import Form from 'components/layout/Form'
import AddressForm from 'components/addresses/AddressForm'
import styled from 'styled-components'

const Container = styled.div`
  background: white;
  padding: 0 40px 40px;
`

class NewAddressModal extends Component {
  render() {
    const { createAddress, onSave } = this.props

    return (
      <Container>
        <Form
          md={8}
          resourceName="address"
          title="Create Address"
          subtitle="Add Shipment Location"
          message="Successfully created address"
          validateFunction={validateAddress}
          action={createAddress}
          saveText="Create"
          callback={onSave}
        >
          {(handleChange, address, errors) => (
            <AddressForm handleChange={handleChange} address={address} errors={errors} />
          )}
        </Form>
      </Container>
    )
  }
}

NewAddressModal.propTypes = {
  onSave: PropTypes.func,
}

NewAddressModal.defaultProps = {
  onSave: () => {},
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createAddress,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withAlerts(NewAddressModal)))
