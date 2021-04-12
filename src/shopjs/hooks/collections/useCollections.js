import { useState, useEffect } from 'react'
import { fetchCollections } from 'shopjs/services/Shopify/buy'

const useCollections = ({ setError, setMessage, loadingWrapper }) => {
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const loadCollections = async () => {
      try {
        let response = await loadingWrapper(fetchCollections())
        setCollections(response)
      } catch (error) {
        setError(error)
        setMessage({ type: 'error', text: 'The collections cannot be loaded' })
      }
    }
    loadCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [{ collections }]
}

export default useCollections
