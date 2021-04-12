import React, { useEffect, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { SignupForm } from 'shopjs/components'
import { IconButton, Dialog, DialogTitle, DialogContent, Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const SignupModal = ({ open, setOpen, onLoginClick }) => {
  const {
    accountAuth: { isLoggedIn },
  } = useContext(ShopifyContext)

  useEffect(() => {
    if (isLoggedIn && open) setOpen(false)
  }, [isLoggedIn, open, setOpen])

  const handleClose = () => setOpen(false)

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Box>Sign In</Box>
          <Box m={-1}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <SignupForm modal onLoginClick={onLoginClick} />
      </DialogContent>
    </Dialog>
  )
}

export default SignupModal
