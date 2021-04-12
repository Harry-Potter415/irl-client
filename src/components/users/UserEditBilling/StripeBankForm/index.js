import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateStripeAccount } from 'actions/stripe/accounts'
import { Button } from '@material-ui/core'
import { useStripe } from '@stripe/react-stripe-js'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import Typography from '@material-ui/core/Typography'
import FormHeader from 'components/layout/FormHeader'
import FormContainer from 'components/layout/FormContainer'
import { STRIPE_ACCOUNT_TYPES } from 'lib/constants'
import Sync from 'react-select'
import { validateBankDetails } from 'helpers/validations/bankDetails'

const StripeBankForm = ({ updateStripeAccount }) => {
  const stripe = useStripe()
  const [bankDetails] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe) {
      // Stripe.js has not loaded yet
      return
    }

    const validate = validateBankDetails(bankDetails)
    if (!validate.isValid) {
      setErrors(validate.errors)
      return
    }

    const result = await stripe.createToken('bank_account', {
      country: 'US',
      currency: 'usd',
      routing_number: bankDetails.routingNumber,
      account_number: bankDetails.accountNumber,
      account_holder_name: bankDetails.accountHolderName,
      account_holder_type: bankDetails.accountHolderType,
    })

    if (result.error) {
      console.log('error', result.error)
    } else {
      updateStripeAccount(result.token.id)
    }
  }

  const handleChange = (e, options = {}) => {
    let value
    let name
    if (options.reactSelect) {
      value = e && e.value
      name = options.field
    } else {
      value = e.target.value
      name = e.target.name
    }
    bankDetails[name] = value
  }

  return (
    <FormContainer>
      <FormHeader title="Add Bank Information" />
      <Typography variant="body1">Account Type</Typography>
      <ReactSelect
        label=""
        name="accountHolderType"
        options={STRIPE_ACCOUNT_TYPES}
        SelectComponent={Sync}
        handleChange={e => {
          handleChange(e, { reactSelect: true, field: 'accountHolderType' })
        }}
        error={errors.accountHolderType}
      />
      <TextInput
        label="Account Holder Name*"
        name="accountHolderName"
        value={bankDetails.accountHolderName}
        handleChange={handleChange}
        error={errors.accountHolderName}
      />
      <TextInput
        label="Account Number*"
        name="accountNumber"
        value={bankDetails.accountNumber}
        handleChange={handleChange}
        error={errors.accountNumber}
      />
      <TextInput
        label="Routing Number*"
        placeholder="ACH routing number, not wire"
        name="routingNumber"
        value={bankDetails.routingNumber}
        handleChange={handleChange}
        error={errors.routingNumber}
      />
      <Button
        style={{ marginTop: '20px', width: '100%' }}
        color="primary"
        variant="contained"
        type="submit"
        disabled={false}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </FormContainer>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateStripeAccount,
    },
    dispatch
  )
}

export default connect(
  null,
  mapDispatchToProps
)(StripeBankForm)
