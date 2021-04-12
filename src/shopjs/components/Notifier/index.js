import React, { useContext, useState, useEffect } from 'react'
import { ShopifyContext } from 'shopjs/context'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'
import { SnackbarContent, IconButton, withStyles, Snackbar } from '@material-ui/core'

const styles = theme => ({
  success: {
    backgroundColor: indigo[500],
  },
  error: {
    backgroundColor: pink[500],
  },
  warning: {
    backgroundColor: indigo[500],
  },
})

const Notifier = ({ classes }) => {
  const {
    notify: { message, setMessage },
  } = useContext(ShopifyContext)
  const [open, setIsOpen] = useState(false)

  useEffect(() => {
    if (message !== null && !open) setIsOpen(true)
    else if (message === null && open) setIsOpen(false)
  }, [message, open, setIsOpen])

  const handleSnackbarClose = () => setMessage(null)

  return (
    message && (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        open={open}
      >
        <SnackbarContent
          aria-describedby="notifier"
          className={classNames({ [classes.error]: message.type === 'error' })}
          message={message.text}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  )
}

export default withStyles(styles)(Notifier)
