import React from 'react'
import { LoginForm } from 'shopjs/components'
import { IconButton, Dialog, DialogTitle, DialogContent, Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'

const LoginModal = ({ open, handleClose, history }) => {
  const handleSignupClick = () => {
    handleClose()
    history.push('/signup')
  }

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
        <LoginForm handleSignupClick={handleSignupClick} />
      </DialogContent>
    </Dialog>
  )
}

export default withRouter(LoginModal)
