import React, { useLayoutEffect, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { LoginForm } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { withStyles, Paper, Container, Typography } from '@material-ui/core'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    margin: '50px auto',
    padding: theme.spacing(3, 2),
  },
})

const Login = ({ classes, history }) => {
  const {
    accountAuth: { isLoggedIn },
  } = useContext(ShopifyContext)

  useLayoutEffect(() => {
    if (isLoggedIn) history.push('/')
  }, [isLoggedIn, history])

  const handleSignupClick = () => {
    history.push('/signup')
  }

  return (
    <Container maxWidth="sm" fixed>
      <Paper className={classes.paper}>
        <Typography variant="h5">Login</Typography>
        <LoginForm handleSignupClick={handleSignupClick} />
      </Paper>
    </Container>
  )
}

export default withStyles(styles)(withRouter(Login))
