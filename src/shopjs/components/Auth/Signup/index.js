import React, { useLayoutEffect, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { SignupForm } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { withStyles, Paper, Container, Typography } from '@material-ui/core'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    margin: '50px auto',
    padding: theme.spacing(3, 2),
  },
})

const Signup = ({ classes, history }) => {
  const {
    accountAuth: { isLoggedIn },
  } = useContext(ShopifyContext)

  useLayoutEffect(() => {
    if (isLoggedIn) history.push('/')
  }, [isLoggedIn, history])

  const handleLoginClick = () => {
    history.push('/login')
  }

  return (
    <Container maxWidth="sm" fixed>
      <Paper className={classes.paper}>
        <Typography variant="h5">Sign Up</Typography>
        <SignupForm handleLoginClick={handleLoginClick} />
      </Paper>
    </Container>
  )
}

export default withRouter(withStyles(styles)(Signup))
