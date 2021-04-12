/* global localStorage */
import { useState, useEffect, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'

const useMarketing = (shouldOpenSubscribe = false) => {
  const [subscribeOpen, setSubscribeOpen] = useState(false)

  // Use the guest context
  const {
    errors: { setError },
  } = useContext(ShopifyContext)

  useEffect(() => {
    const subscribeMarketingFromStorage = localStorage.getItem('subscribeMarketing')

    if (subscribeMarketingFromStorage) {
      try {
        setSubscribeOpen(JSON.parse(subscribeMarketingFromStorage))
      } catch (error) {
        setError(error)
      }
    } else {
      if (shouldOpenSubscribe) {
        setSubscribeOpen(true)
      }
    }
  }, [shouldOpenSubscribe, setError])

  const setSubscribeOpenFn = isOpen => {
    if (!isOpen) {
      localStorage.setItem('subscribeMarketing', isOpen.toString())
    }

    setSubscribeOpen(isOpen)
  }

  return [subscribeOpen, setSubscribeOpenFn]
}

export default useMarketing
