import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { useForm } from 'shopjs/hooks'
import { Typography, Box, Grid, Button, TextField } from '@material-ui/core'

const validationRules = [
  {
    name: 'email',
    type: 'required',
    stateMap: 'email',
  },
  {
    name: 'password',
    type: 'required',
    stateMap: 'password',
  },
  {
    name: 'passwordConfirm',
    type: 'required',
    stateMap: 'passwordConfirm',
  },
  {
    name: 'passwordConfirm',
    type: 'compareFields',
    compareWith: 'password',
    stateMap: 'passwordConfirm',
    error: "The passwords didn't match",
  },
]

const SignupForm = ({ classes, handleLoginClick }) => {
  const [{ validation, isFieldValid, values }, { email, password }] = useForm(null, validationRules)

  const {
    accountAuth: { signup },
  } = useContext(ShopifyContext)

  const handleSignup = async e => {
    e.preventDefault()
    signup({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          margin="dense"
          fullWidth
          name="email"
          placeholder="Email"
          variant="outlined"
          error={isFieldValid('email')}
          {...email('email')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          name="password"
          placeholder="Password"
          error={isFieldValid('password')}
          {...password('password')}
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          name="passwordConfirm"
          placeholder="Password confirmation"
          error={isFieldValid('passwordConfirm')}
          {...password('passwordConfirm')}
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Box my={2}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSignup}
            disabled={!validation.valid}
          >
            Signup
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={2}>
          <Button size="small" onClick={handleLoginClick} aria-label="Login">
            <Typography variant="caption">Already registered? Login</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SignupForm
