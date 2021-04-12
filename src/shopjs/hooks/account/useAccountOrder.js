import { useContext, useState, useEffect } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { getPastOrder } from 'shopjs/services/Shopify/storefront'
import { get } from 'shopjs/helpers'

const useAccountOrder = () => {
  const [orderNumber, setOrderNumber] = useState(null)
  const [order, setOrder] = useState(null)
  const {
    loading: { loadingWrapper },
    accountAuth: { accessToken },
    notify: { setMessage },
    errors: { setError },
  } = useContext(ShopifyContext)

  useEffect(() => {
    // XHR
    const loadOrder = async () => {
      try {
        const response = await loadingWrapper(
          getPastOrder({
            customerAccessToken: accessToken,
            query: orderNumber.toString(),
          })
        )

        // Get the order from the graphql response
        const order = get(response, 'node', null)

        // Since there is no endpoint for retreiving order by id
        // we try to filter all the orders by order number
        // and if the first filtered order being returned by the api
        // is the order we are looking for keep it
        if (order && order.orderNumber === orderNumber) {
          setOrder(order)
        } else {
          // Otherwise displays error message
          setMessage({ type: 'error', text: 'The order cannot be loaded or not exists' })
        }
      } catch (error) {
        setError(error)
        setMessage({ type: 'error', text: 'The order cannot be loaded' })
      }
    }

    const hasOrderNumber = orderNumber !== null && typeof orderNumber !== 'undefined'

    if (hasOrderNumber) {
      loadOrder()
    }
  }, [accessToken, orderNumber, setError, setMessage, loadingWrapper])

  return [{ order, orderNumber: get(order, 'orderNumber') }, { setOrderNumber }]
}

export default useAccountOrder
