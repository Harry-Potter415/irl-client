/* global localStorage */
import { useEffect, useState } from 'react'

const parseProductsIds = recentProducts => {
  if (!recentProducts) return new Set()

  let parsed = []

  try {
    parsed = JSON.parse(recentProducts)
  } catch (e) {
    // Delete the recent showm products ids from
    // the locale storage if their json is invalid
    localStorage.removeItem('recentProducts')
  }

  return new Set(parsed)
}

const useRecentProducts = ({ subscribe, unsubscribe }) => {
  const [recentProductsIds, setRecentProductsIds] = useState([])

  useEffect(() => {
    // Load recent products ids from localstorage
    const recentProductsIds = localStorage.getItem('recentProductsIds')

    if (recentProductsIds) {
      const lastProductsIds = parseProductsIds(recentProductsIds)
      setRecentProductsIds([...lastProductsIds])
    }
  }, [])

  useEffect(() => {
    const onProductLoaded = e => {
      const numberOfLastItems = 10
      const recentProductsIds = localStorage.getItem('recentProductsIds')

      // ProductIds from localStorage
      const productIds = parseProductsIds(recentProductsIds)
      productIds.add(e.detail.id)
      // Slice the last 10 product ids so that way the list won't go indefinitely
      let latestProductsIds = [...productIds].slice(
        productIds.size > numberOfLastItems ? productIds.size - numberOfLastItems : 0,
        productIds.size
      )

      // Keep the ids of the last 10 shown products,
      // so they can be suggested in a carousel
      setRecentProductsIds(latestProductsIds)
      // Store the ids in the localstorage
      localStorage.setItem('recentProductsIds', JSON.stringify(latestProductsIds))
    }

    subscribe('productLoaded', onProductLoaded)

    return () => {
      unsubscribe('productLoaded', onProductLoaded)
    }
  }, [subscribe, unsubscribe])

  return recentProductsIds
}

export default useRecentProducts
