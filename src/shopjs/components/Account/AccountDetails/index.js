import React from 'react'
import { useAccountDetails } from 'shopjs/hooks'
import { AccountDetailsForm, Breadcrumb } from 'shopjs/components'
import { Container, Paper, Box } from '@material-ui/core'

const AccountDetails = ({ classes }) => {
  const [{ accountDetails }, { accountAddressUpdate, accountDetailsUpdate }] = useAccountDetails()

  return (
    <>
      <Breadcrumb current="Account" />
      <Container maxWidth="sm">
        {!!accountDetails && (
          <Box my={2}>
            <Paper>
              <AccountDetailsForm
                accountDetails={accountDetails}
                accountDetailsUpdate={accountDetailsUpdate}
                accountAddressUpdate={accountAddressUpdate}
              />
            </Paper>
          </Box>
        )}
      </Container>
    </>
  )
}

export default AccountDetails
