import React, { useState, useEffect, createContext } from 'react'
import {
  useGA,
  useCheckout,
  useEvents,
  useAccountAuth,
  useShop,
  useCollections,
  useRecentProducts,
  useLoading,
} from 'shopjs/hooks'
import config from 'shopjs/config'

export const ShopifyContext = createContext({})

const getCurrencyFormatter = currencyCode =>
  currencyCode
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      })
    : { format: number => number }

export const ShopifyProvider = ({ children, currentCheckout }) => {
  // Keep the last error
  const [error, setError] = useState(null)

  // Notifier
  const [message, setMessage] = useState(null)
  const showAlertError = msg => setMessage({ type: 'error', text: msg })
  const showAlertSuccess = msg => setMessage({ type: 'success', text: msg })
  const showAlertWarning = msg => setMessage({ type: 'warning', text: msg })

  // Publish/subscribe events
  const [{ subscribe, unsubscribe, dispatch }] = useEvents()

  // Toggle open the cart
  const [cartOpen, setCartOpen] = useState(false)
  const handleToggleCart = () => setCartOpen(!cartOpen)
  const handleOpenCart = () => setCartOpen(true)
  const handleCloseCart = () => setCartOpen(false)

  // Check is there is ongoing XHR request
  const [isLoading, loadingWrapper] = useLoading({ subscribe, unsubscribe, dispatch })

  // Currency formatter
  const [currencyFormatter, setCurrencyFormatter] = useState(getCurrencyFormatter())

  // Use checkout data and methods
  const [checkoutData, checkoutMethods] = useCheckout({
    setError,
    showAlertError,
    dispatch,
    getCurrencyFormatter,
    loadingWrapper,
    currentCheckout,
  })

  const {
    checkout,
    totalTax,
    totalPrice,
    lineItemSubtotalPrice,
    discount,
    subtotalPrice,
    totalLineItems,
  } = checkoutData

  const { addLineItem, updateLineItem, removeLineItem, applyPromoCode, clearCart } = checkoutMethods

  // Customer's signup/login/signout
  const [{ isLoggedIn, accessToken }, { login, signup, signout, setAccessToken }] = useAccountAuth({
    setError,
    setMessage,
    loadingWrapper,
  })

  // Shop's general details
  const [{ name: shopName, currencyCode: shopCurrencyCode }] = useShop({
    setError,
    setMessage,
    loadingWrapper,
  })

  // Use collections data
  const [{ collections }] = useCollections({ setError, setMessage, loadingWrapper })

  // Keep the recent shown products ids in the localstorage
  const recentProductsIds = useRecentProducts({ subscribe, unsubscribe })

  // Use Google Analytics
  useGA({ gaId: config.vendors.googleAnalytics.apiKey, shopName, subscribe, unsubscribe })

  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: shopCurrencyCode || 'USD',
    })

    setCurrencyFormatter(formatter)
  }, [shopCurrencyCode, setCurrencyFormatter])

  useEffect(() => {
    // Print the error on the console for development env
    if (process.env.NODE_ENV === 'development' && error) {
      console.error(error)
    }
  }, [error])

  return (
    <ShopifyContext.Provider
      value={{
        loading: {
          isLoading,
          loadingWrapper,
        },
        shop: {
          name: shopName,
        },
        accountAuth: {
          isLoggedIn,
          accessToken,
          login,
          signup,
          signout,
          setAccessToken,
        },
        cart: {
          checkout,
          totalTax,
          totalPrice,
          lineItemSubtotalPrice,
          discount,
          subtotalPrice,
          totalLineItems,
          addLineItem,
          updateLineItem,
          removeLineItem,
          applyPromoCode,
          cartOpen,
          handleToggleCart,
          handleOpenCart,
          handleCloseCart,
          clearCart,
        },
        notify: {
          message,
          setMessage,
          showAlertError,
          showAlertSuccess,
          showAlertWarning,
        },
        errors: { error, setError },
        formatters: {
          currency: currencyFormatter,
          dateTime: new Intl.DateTimeFormat('en-US'),
        },
        events: { subscribe, unsubscribe, dispatch },
        collections: { collections },
        products: { recentProductsIds },
      }}
    >
      {children}
    </ShopifyContext.Provider>
  )
}
