import { useState, useEffect, useCallback } from 'react'
import {
  createCheckout,
  fetchCheckoutById,
  addLineItemsToCheckout,
  updateLineItemsFromCheckout,
  removeLineItemsFromCheckout,
  addDiscountToCheckout,
} from 'shopjs/services/Shopify/buy'
import { get } from 'lodash'
import { createOrder, updateOrder } from 'actions/orders'
import { isEqual } from 'lodash'
import { usePrevious } from 'hooks'
import { store } from 'index'

const useCheckout = ({
  setError,
  showAlertError,
  dispatch,
  getCurrencyFormatter,
  loadingWrapper,
  currentCheckout,
}) => {
  const [checkout, setCheckout] = useState(null)
  const [checkoutId, setCheckoutId] = useState(null)

  const prevCurrentCheckout = usePrevious(currentCheckout)

  const [currencyFormatter, setCurrencyFormatter] = useState(getCurrencyFormatter())

  const totalPrice = get(checkout, 'totalPrice', 0)
  const lineItemSubtotalPrice = get(checkout, 'lineItemsSubtotalPrice.amount', 0)
  const discount = parseFloat(lineItemSubtotalPrice) - parseFloat(totalPrice)
  const subtotalPrice = get(checkout, 'subtotalPrice', 0)

  const [totalLineItems, setTotalLineItems] = useState(0)

  // set checkoutId
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (currentCheckout && !isEqual(currentCheckout, prevCurrentCheckout)) {
      const id = currentCheckout.id
      if (id) {
        // Get the checkout by checkoutId
        setCheckoutId(id)
      } else {
        // Create new checkout if there is no checkoutId
        createNewCheckout()
      }
    }
  })

  // Use currency formatter by the checkout currency
  useEffect(() => {
    if (checkout && checkout.currencyCode) {
      const formatter = getCurrencyFormatter(checkout.currencyCode)
      setCurrencyFormatter(formatter)
    }
  }, [checkout, getCurrencyFormatter])

  const firstLineItem = get(checkout, 'lineItems', 0)
  useEffect(() => {
    updateTotalLineItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLineItem])

  const updateTotalLineItems = () => {
    let totalLineItems = 0
    totalLineItems =
      checkout && checkout.lineItems.map(li => parseInt(li.quantity)).reduce((a, b) => a + b, 0)
    setTotalLineItems(totalLineItems)
  }

  const createNewCheckoutForCurrentOrder = useCallback(
    async checkoutId => {
      try {
        const response = await loadingWrapper(createCheckout())
        updateOrder(checkoutId, { shopifyCheckoutId: response.id })(store.dispatch).then(() => {
          setCheckoutId(response.id)
          setCheckout(response)
        })
      } catch (error) {
        setError(error)
      }
    },
    [setError, loadingWrapper]
  )

  const createNewCheckout = useCallback(async () => {
    try {
      const response = await loadingWrapper(createCheckout())
      createOrder({ shopifyCheckoutId: response.id })(store.dispatch).then(() => {
        setCheckoutId(response.id)
        setCheckout(response)
      })
    } catch (error) {
      setError(error)
    }
  }, [setError, loadingWrapper])

  const clearCart = () => {
    const lineItemIds = checkout.lineItems && checkout.lineItems.map(item => item.id)
    removeLineItemsFromCheckout(checkout.id, lineItemIds)
      .then(res => setCheckout(res))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    const loadCheckout = async () => {
      try {
        const response = await loadingWrapper(fetchCheckoutById(checkoutId))
        // if the checkout was completed, save the order id and create a new checkout
        if (checkoutId && !response) {
          return createNewCheckoutForCurrentOrder(checkoutId)
        }
        if (response.completedAt && response.order.id) {
          updateOrder(checkoutId, {
            shopifyOrderId: response.order.id,
            shopifyOrderNumber: response.order.orderNumber,
          })(store.dispatch)
            .then(res => {
              if (res.status === 200) {
                createNewCheckout()
              }
            })
            .catch(e => console.error(e))
        }
        setCheckout(response)
      } catch (error) {
        setError(error)
      }
    }
    // If we have checkoutId and no checkout, then load it
    if (checkoutId && !checkout) {
      loadCheckout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutId])

  const addLineItem = async (variantId, quantity, handle) => {
    try {
      const response = await loadingWrapper(
        addLineItemsToCheckout(checkoutId, [{ variantId, quantity }])
      )
      setCheckout(response)
      dispatch('addedToCart', { handle })
      dispatch('checkoutUpdated')
      return response
    } catch (error) {
      setError(error)
      showAlertError('This product cannot be added to your Cart')
    }
  }

  const updateLineItem = async (id, variantId, quantity) => {
    try {
      const response = await loadingWrapper(
        updateLineItemsFromCheckout(checkoutId, [{ id, variantId, quantity }])
      )
      if (quantity === 0) dispatch('removedFromCart', { variantId })
      setCheckout(response)
      dispatch('checkoutUpdated')
    } catch (error) {
      setError(error)
      showAlertError('This product currently cannot be updated')
    }
  }

  const removeLineItem = async ({
    id,
    variant: {
      product: { handle },
    },
  }) => {
    try {
      const response = await loadingWrapper(removeLineItemsFromCheckout(checkoutId, [id]))
      setCheckout(response)
      dispatch('removedFromCart', { handle })
      dispatch('checkoutUpdated')
    } catch (error) {
      setError(error)
      showAlertError('This product currently cannot be removed')
    }
  }

  const applyPromoCode = async promoCode => {
    try {
      const response = await loadingWrapper(addDiscountToCheckout(checkoutId, promoCode))
      setCheckout(response)
      dispatch('checkoutUpdated')
    } catch (error) {
      setError(error)
      showAlertError('This promo code cannot be applied')
    }
  }

  let checkoutData = {
    checkout,
    totalTax: currencyFormatter.format(get(checkout, 'totalTax', 0)),
    totalPrice: currencyFormatter.format(totalPrice),
    lineItemSubtotalPrice,
    discount: discount ? currencyFormatter.format(discount) : null,
    subtotalPrice: currencyFormatter.format(parseFloat(subtotalPrice) + discount),
    totalLineItems,
  }

  const checkoutMethods = {
    addLineItem,
    updateLineItem,
    removeLineItem,
    applyPromoCode,
    clearCart,
  }

  return [checkoutData, checkoutMethods]
}

export default useCheckout
