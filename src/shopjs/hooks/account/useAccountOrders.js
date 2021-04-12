import { useContext, useState, useEffect, useCallback } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { getPastOrders } from 'shopjs/services/Shopify/storefront'
import { usePagination } from 'shopjs/hooks'
import { get } from 'shopjs/helpers'

const useAccountOrders = () => {
  // Keep the orders
  const [orders, setOrders] = useState([])

  // Use pagination
  const [
    { page, hasNextPage, hasPreviousPage, pageNumber, cursor },
    { getPreviousPage, getNextPage, setPageNumber },
  ] = usePagination(orders)

  // Use the guest context
  const {
    loading: { loadingWrapper },
    accountAuth: { accessToken },
    notify: { setMessage },
    errors: { setError },
  } = useContext(ShopifyContext)

  const reset = useCallback(() => {
    setOrders([])
    setPageNumber(0)
  }, [setPageNumber])

  useEffect(() => {
    // XHR
    const loadOrders = async () => {
      if (orders[pageNumber]) return

      try {
        let response

        if (pageNumber === 0) {
          // If it's the first page
          response = await loadingWrapper(getPastOrders({ customerAccessToken: accessToken }))
        } else {
          // Load page by page number
          response = await loadingWrapper(
            getPastOrders({ customerAccessToken: accessToken, cursor })
          )
        }

        // Normalize graphql response
        const normalized = get(response, 'edges', []).map(edge => ({
          ...edge,
          ...response.pageInfo,
        }))

        if (pageNumber === 0) {
          setOrders([normalized])
        } else {
          setOrders(orders.concat([normalized]))
        }
      } catch (error) {
        setError(error)
        setMessage({ type: 'error', text: 'The orders cannot be loaded' })
      }
    }

    // Load the orders if there is access token
    if (accessToken) {
      loadOrders()
    } else {
      // otherwise clear them if there are any
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, pageNumber])

  return [{ page, hasPreviousPage, hasNextPage }, { getPreviousPage, getNextPage }]
}

export default useAccountOrders
