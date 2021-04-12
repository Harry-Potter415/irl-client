import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { withStyles, Typography, Box, Grid, Button, TextField } from '@material-ui/core'
import { useForm } from 'shopjs/hooks'

const styles = theme => ({
  text: {
    display: 'inline-block',
  },
  button: {
    verticalAlign: 'top',
  },
})

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
]

const LoginForm = ({ handleSignupClick }) => {
  const [{ validation, isFieldValid, values }, { email, password }] = useForm(null, validationRules)
  const {
    accountAuth: { login },
  } = useContext(ShopifyContext)

  const handleClick = () => {
    login({
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
          label="Email"
          variant="outlined"
          placeholder="Email"
          error={isFieldValid('email')}
          {...email('email')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Password"
          placeholder="Password"
          error={isFieldValid('password')}
          {...password('password')}
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Box my={2}>
          <Button
            fullWidth
            variant="contained"
            disabled={!validation.valid}
            type="submit"
            onClick={handleClick}
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} />
        <Button size="small" onClick={handleSignupClick} aria-label="Signup">
          <Typography variant="caption">Create your account</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(LoginForm)
