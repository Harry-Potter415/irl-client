import React from 'react'
import { useAccountDetails } from 'shopjs/hooks'
import { AccountAddressForm, Breadcrumb } from 'shopjs/components'
import { Container, Paper, Box } from '@material-ui/core'

const AccountDetails = ({ classes }) => {
  const [{ accountDetails }, { accountAddressUpdate }] = useAccountDetails()

  return (
    <>
      <Breadcrumb current="Account" />
      <Container maxWidth="sm">
        {!!accountDetails && (
          <Box my={2}>
            <Paper>
              <AccountAddressForm
                address={accountDetails.defaultAddress}
                accountAddressUpdate={accountAddressUpdate}
                title="Default Address"
              />
            </Paper>
          </Box>
        )}
      </Container>
    </>
  )
}

export default AccountDetails
