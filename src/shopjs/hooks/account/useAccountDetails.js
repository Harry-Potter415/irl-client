import { useContext, useState, useEffect } from 'react'
import { ShopifyContext } from 'shopjs/context'
import {
  getCustomerData,
  customerAddressUpdate,
  customerUpdate,
} from 'shopjs/services/Shopify/storefront'
import { get } from 'shopjs/helpers'

const normalizeAccountDetails = details => ({
  email: get(details, 'email', ''),
  firstName: get(details, 'firstName', ''),
  lastName: get(details, 'lastName', ''),
  phone: get(details, 'phone', ''),
  defaultAddress: {
    id: get(details, 'defaultAddress.id', null),
    address1: get(details, 'defaultAddress.address1', ''),
    address2: get(details, 'defaultAddress.address2', ''),
    city: get(details, 'defaultAddress.city', ''),
    country: get(details, 'defaultAddress.country', ''),
    addressFirstName: get(details, 'defaultAddress.firstName', ''),
    addressLastName: get(details, 'defaultAddress.lastName', ''),
    addressPhone: get(details, 'defaultAddress.phone', ''),
    province: get(details, 'defaultAddress.province', ''),
    zip: get(details, 'defaultAddress.zip', ''),
  },
})

const useAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null)
  const {
    loading: { loadingWrapper },
    accountAuth: { accessToken, setAccessToken },
    notify: { setMessage },
    errors: { setError },
  } = useContext(ShopifyContext)

  useEffect(() => {
    // XHR
    const loadAccountDetails = async () => {
      try {
        const response = await loadingWrapper(getCustomerData({ customerAccessToken: accessToken }))

        setAccountDetails(normalizeAccountDetails(response))
      } catch (error) {
        setError(error)
        setMessage({ type: 'error', text: 'The account cannot be loaded' })
      }
    }

    if (accessToken) {
      loadAccountDetails()
    }
  }, [accessToken, setError, setMessage, loadingWrapper])

  const accountUpdate = async (reqFn, reqParams, cb, errText, rethrowError) => {
    try {
      const response = await loadingWrapper(reqFn(reqParams))

      cb && cb(response)
    } catch (errors) {
      if (errors && errors.length) {
        // User errors
        const message = get(errors[0], 'message', errText)
        setMessage({ type: 'error', text: message })

        if (rethrowError) {
          throw new Error(message)
        }
      } else {
        setError(get(errors, 'response.errors'))
      }
    }
  }

  // Update customer's account address
  const accountAddressUpdate = (id, address, rethrowError) => {
    return accountUpdate(
      customerAddressUpdate,
      { customerAccessToken: accessToken, id, address },
      null,
      'This address cannot be updated',
      rethrowError
    )
  }

  // Update customer's account info
  const accountDetailsUpdate = (account, rethrowError) => {
    return accountUpdate(
      customerUpdate,
      { customerAccessToken: accessToken, customer: account },
      accessToken => !!accessToken && setAccessToken(accessToken),
      'This account cannot be updated',
      rethrowError
    )
  }

  return [{ accountDetails }, { accountAddressUpdate, accountDetailsUpdate }]
}

export default useAccountDetails
