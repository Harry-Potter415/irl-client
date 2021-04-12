import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'

const useGA = ({ gaId, shopName, subscribe, unsubscribe }) => {
  const [initialized, setInitialized] = useState(false)
  const trackerName = shopName && shopName.replace(/[^0-9a-z]/gi, '') // only alphanumeric
  useEffect(() => {
    if (trackerName && gaId) {
      const gaArgs = {
        gaOptions: {
          name: trackerName,
        },
      }

      // Initialize Google Analytics
      ReactGA.initialize(gaId, gaArgs)

      setInitialized(true)
    }
  }, [trackerName, gaId])

  useEffect(() => {
    const onCollectionLoaded = e =>
      initialized &&
      ReactGA.event(
        {
          category: 'Collections',
          action: `Collection View - ${e.detail.handle}`,
        },
        [trackerName]
      )

    const onProductLoaded = e =>
      initialized &&
      ReactGA.event(
        {
          category: 'Products',
          action: `Product View - ${e.detail.handle}`,
        },
        [trackerName]
      )

    const onNavigatedToCheckout = () =>
      ReactGA.event(
        {
          category: 'Cart',
          action: 'Checkout',
        },
        [trackerName]
      )

    const onAddedToCart = e =>
      initialized &&
      ReactGA.event(
        {
          category: 'Cart',
          action: `Added To The Cart - ${e.detail.handle}`,
        },
        [trackerName]
      )

    const onRemovedFromCart = e =>
      initialized &&
      ReactGA.event(
        {
          category: 'Cart',
          action: `Removed From The Cart - ${e.detail.handle}`,
        },
        [trackerName]
      )

    subscribe('collectionLoaded', onCollectionLoaded)
    subscribe('productLoaded', onProductLoaded)
    subscribe('navigatedToCheckout', onNavigatedToCheckout)
    subscribe('addedToCart', onAddedToCart)
    subscribe('removedFromCart', onRemovedFromCart)

    return () => {
      unsubscribe('collectionLoaded', onCollectionLoaded)
      unsubscribe('productLoaded', onProductLoaded)
      unsubscribe('navigatedToCheckout', onNavigatedToCheckout)
      unsubscribe('addedToCart', onAddedToCart)
      unsubscribe('removedFromCart', onRemovedFromCart)
    }
  }, [subscribe, initialized, trackerName, unsubscribe])
}

export default useGA
