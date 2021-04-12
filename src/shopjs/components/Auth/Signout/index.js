import React, { useLayoutEffect, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { withRouter, Redirect } from 'react-router-dom'

const Signout = ({ location: { search } }) => {
  const urlParams = new URLSearchParams(search)
  const {
    accountAuth: { signout },
  } = useContext(ShopifyContext)

  useLayoutEffect(() => {
    return () => {
      signout()
    }
  }, [signout])

  return <Redirect to={urlParams.get('redirect') || '/'} />
}

export default withRouter(Signout)
