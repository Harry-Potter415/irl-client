import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ loggedIn, component: Component, marketingSubscribe, ...rest }) => {
  const {
    loading: { isLoading },
    accountAuth: { isLoggedIn },
  } = useContext(ShopifyContext)

  if (!isLoading && loggedIn && !isLoggedIn) return <Redirect to="/" />

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default AuthRoute
