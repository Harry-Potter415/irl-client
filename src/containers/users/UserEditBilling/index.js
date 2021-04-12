import React, { useEffect, useState, Fragment } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { fetchMe } from 'actions/auth'
import { selectCurrentUser } from 'selectors/auth'
import { selectStripeAccountLink } from 'selectors/stripe/accountLinks'
import { selectStripeAccount } from 'selectors/stripe/accounts'
import { createStripeAccountLink } from 'actions/stripe/accountLinks'
import { createStripeAccount, getStripeAccount } from 'actions/stripe/accounts'
import { isEqual } from 'lodash'
import StripeBankForm from 'components/users/UserEditBilling/StripeBankForm'
import Typography from '@material-ui/core/Typography'
import { STRIPE_API_KEY } from 'shopjs/services/Stripe'

const stripePromise = loadStripe(STRIPE_API_KEY)

const UserEditBilling = ({
  fetchMe,
  currentUser,
  createStripeAccountLink,
  stripeAccountLink,
  createStripeAccount,
  getStripeAccount,
  stripeAccount,
}) => {
  const [showBankForm, setShowBankForm] = useState(false)
  const [detailsComplete, setDetailsComplete] = useState(false)

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  useEffect(() => {
    async function createLink() {
      await createStripeAccountLink()
    }

    async function createAccount() {
      await createStripeAccount()
    }

    async function getAccount() {
      await getStripeAccount()
    }

    // skip this hook if the currentUser hasn't loaded
    if (!currentUser) return

    const stripeAccountId = currentUser.attributes.stripeAccount

    // if currentUser doesn't have an associated Stripe account, create one
    if (!stripeAccountId) {
      createAccount()
      return
    }

    // if currentUser has a Stripe account, fetch it to see if it has all the
    // necessary info
    if (!stripeAccount) {
      getAccount()
      return
    }

    // if no requirements left, the user has successfully updated their billing
    // info
    if (stripeAccount.requirements.past_due.length === 0) {
      setDetailsComplete(true)
      return
    }

    const onlyBankDetailsMissing = isEqual(stripeAccount.requirements.past_due, [
      'external_account',
    ])
    // if the account has all the info, exit and display the bank form
    if (onlyBankDetailsMissing) {
      setShowBankForm(true)
      return
    }

    // If the account doesn't have the info, create and redirect to onboarding
    // link
    if (!stripeAccountLink) {
      createLink()
      return
    }
    window.location = stripeAccountLink

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeAccountLink, currentUser, stripeAccount])

  return (
    <Fragment>
      {showBankForm && (
        <Elements stripe={stripePromise}>
          <StripeBankForm />
        </Elements>
      )}
      {detailsComplete && (
        <Typography variant="body">
          Your billing info is up to date! If you want to change it please contact{' '}
          <a href="mailto:hello@poweredbyextra.com">hello@poweredbyextra.com</a>
        </Typography>
      )}
    </Fragment>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMe,
      createStripeAccountLink,
      createStripeAccount,
      getStripeAccount,
    },
    dispatch
  )

const mapStateToProps = state => {
  const currentUser = selectCurrentUser(state)
  const stripeAccountLink = selectStripeAccountLink(state)
  const stripeAccount = selectStripeAccount(state)
  return {
    currentUser,
    stripeAccountLink,
    stripeAccount,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(UserEditBilling)))
