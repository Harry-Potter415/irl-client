import React from 'react'
import { useForm } from 'shopjs/hooks'
import { get } from 'shopjs/helpers'
import { withStyles, TextField, Button, Box, Typography } from '@material-ui/core'

const styles = theme => ({
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
})

const validationRules = [
  {
    name: 'passwordConfirm',
    type: 'compareFields',
    compareWith: 'password',
    stateMap: 'passwordConfirm',
    error: "The passwords didn't match",
  },
]

const AccountDetailsForm = ({
  classes,
  accountDetails,
  accountAddressUpdate,
  accountDetailsUpdate,
}) => {
  const [{ validation, isFieldValid, values }, { text, email, password }] = useForm(
    accountDetails,
    validationRules
  )

  const handleSubmit = e => {
    e.preventDefault()

    const updated = {
      email: get(values, 'email', null),
      firstName: get(values, 'firstName', null),
      lastName: get(values, 'lastName', null),
      phone: get(values, 'phone', null),
    }

    if (values.password) updated.password = values.password

    accountDetailsUpdate(updated)
  }

  return (
    <Box p={2}>
      <Box textAlign="center">
        <Typography variant="h6">Account</Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        error={isFieldValid('email')}
        className={classes.input}
        {...email('email')}
        placeholder="Email"
        required
      />
      <TextField
        fullWidth
        variant="outlined"
        error={isFieldValid('firstName')}
        {...text('firstName')}
        placeholder="First name"
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        error={isFieldValid('lastName')}
        {...text('lastName')}
        placeholder="Last name"
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        error={isFieldValid('password')}
        {...password('password')}
        type="password"
        placeholder="Password"
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        error={isFieldValid('passwordConfirm')}
        {...password('passwordConfirm')}
        type="password"
        placeholder="Password confirmation"
        className={classes.input}
      />
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={!validation.valid}
      >
        Update
      </Button>
    </Box>
  )
}

export default withStyles(styles)(AccountDetailsForm)
