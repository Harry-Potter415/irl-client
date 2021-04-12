import { useState, useEffect } from 'react'
import { fetchShop } from 'shopjs/services/Shopify/buy'
import { get } from 'lodash'

const useShop = ({ setError, setMessage, loadingWrapper }) => {
  const [shop, setShop] = useState(null)

  useEffect(() => {
    const loadShop = async () => {
      try {
        const response = await loadingWrapper(fetchShop())

        setShop(response)
      } catch (error) {
        setError(error)
        setMessage({ type: 'error', text: 'Cannot load shop' })
      }
    }

    loadShop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [
    {
      name: get(shop, 'name'),
      currencyCode: get(shop, 'currencyCode'),
    },
  ]
}

export default useShop
