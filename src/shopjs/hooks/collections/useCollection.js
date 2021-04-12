import { useState, useEffect } from 'react'
import { collectionsIndex } from 'shopjs/services/Algolia'

const useCollection = ({ collectionHandle }) => {
  const [collection, setCollection] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadCollection = async () => {
      try {
        let results = await collectionsIndex.search('', {
          filters: `handle: ${collectionHandle}`,
          page: 0,
          hitsPerPage: 1,
        })

        setCollection(results.hits[0])
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(false)
      }
    }

    if (collectionHandle) loadCollection()
  }, [collectionHandle])

  return {
    isLoaded,
    collection,
  }
}

export default useCollection
