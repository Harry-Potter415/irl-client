/* global localStorage */
import { useState, useEffect } from 'react'
import {
  signupUser,
  signoutUser,
  loginUser,
  renewCustomerAccessToken,
} from 'shopjs/services/Shopify/storefront'
import { get, areRemainDaysLessThanDays } from 'shopjs/helpers'

const useAccountAuth = ({ setMessage, setError, loadingWrapper }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)

  const clearAccessToken = () => {
    setAccessToken(null)
    localStorage.removeItem('accessToken')
  }

  const setAccessTokenFn = accessToken => {
    setAccessToken(accessToken)
    // Store the accessToken to the localStorage
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
  }

  useEffect(() => {
    // Load the access token from the localStorage
    const accessTokenFromStorage = localStorage.getItem('accessToken')

    if (accessTokenFromStorage) {
      try {
        const parsed = JSON.parse(accessTokenFromStorage)
        setAccessToken(parsed)
      } catch (error) {
        setError(error)
        clearAccessToken()
      }
    }
  }, [setError])

  useEffect(() => {
    // Renew the token if it is expiring
    const renewTokenFn = async variables => {
      let success = false

      try {
        const response = await loadingWrapper(
          renewCustomerAccessToken({ customerAccessToken: accessToken.accessToken })
        )
        const newAccessToken = get(response, 'customerAccessToken')

        if (newAccessToken) {
          setAccessTokenFn(newAccessToken)

          success = true
        }
      } catch (errors) {
        const responseErrors = get(errors, 'response.errors')

        if (responseErrors) {
          setError(responseErrors)
        }
      }

      return success
    }

    const checkIsLoggedIn = async () => {
      if (accessToken) {
        // Check if the token is expiring in less than a day
        if (areRemainDaysLessThanDays(accessToken.expiresAt, 1)) {
          // If so, renew it
          const success = await renewTokenFn()

          setIsLoggedIn(success)
          if (!success) clearAccessToken()
        } else {
          // If the token is not expired
          setIsLoggedIn(true)
        }
      } else {
        setIsLoggedIn(false)
      }
    }

    checkIsLoggedIn()
  }, [accessToken, setError, setMessage, loadingWrapper])

  const signupFn = async variables => {
    // User Signup
    const signup = async () => {
      let success = false

      try {
        const response = await loadingWrapper(signupUser({ input: variables }))
        const customerId = get(response, 'customer.id')

        if (customerId) success = true
      } catch (errors) {
        if (errors && errors.length) {
          // User errors
          setMessage({
            type: 'error',
            text: get(errors[0], 'message', 'The account cannot be created'),
          })
        } else {
          setError(get(errors, 'response.errors'))
        }
      }

      return success
    }

    const success = await signup()
    if (success) loginFn(variables)
  }

  const loginFn = variables => {
    // User Login
    const login = async () => {
      try {
        const response = await loadingWrapper(loginUser({ input: variables }))
        const newAccessToken = get(response, 'customerAccessToken')

        if (newAccessToken) {
          setAccessToken(newAccessToken)
          // Store the accessToken to the localStorage
          localStorage.setItem('accessToken', JSON.stringify(newAccessToken))
        }
      } catch (errors) {
        if (errors && errors.length) {
          // User errors
          console.log(get(errors[0], 'message', 'The user cannot be logged in'))
          setMessage({ type: 'error', text: 'The email or password may be incorrect' })
        } else {
          setError(get(errors, 'response.errors'))
        }
      }
    }

    login()
  }

  const signoutFn = variables => {
    // User signout
    const signout = async () => {
      try {
        await loadingWrapper(signoutUser({ customerAccessToken: accessToken.accessToken }))
      } catch (errors) {
        const responseErrors = get(errors, 'response.errors')

        if (responseErrors) {
          setError(responseErrors)
        }
      } finally {
        clearAccessToken()
      }
    }

    signout()
  }

  const accountAuthData = {
    isLoggedIn,
    accessToken: get(accessToken, 'accessToken'),
  }

  const accountAuthMethods = {
    signup: signupFn,
    login: loginFn,
    signout: signoutFn,
    setAccessToken: setAccessTokenFn,
  }

  return [accountAuthData, accountAuthMethods]
}

export default useAccountAuth
