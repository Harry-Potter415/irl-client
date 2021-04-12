import { useCallback, useState } from 'react'

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  let [loadingCount, setLoadingCount] = useState(0)

  // Hide or show the loader if there are still active requests
  const toggleLoading = useCallback(() => {
    loadingCount === 0 ? setIsLoading(false) : setIsLoading(true)
  }, [loadingCount, setIsLoading])

  const loadingWrapper = useCallback(
    async fn => {
      //Increment total loading every time loadingWrapper is called
      setLoadingCount(loadingCount + 1)
      toggleLoading()

      let res
      try {
        res = await fn
      } catch (e) {
        throw e
      }

      //Decrement the loader once the request is completed
      setLoadingCount(loadingCount - 1)
      toggleLoading()

      return res
    },
    [loadingCount, setLoadingCount, toggleLoading]
  )

  return [isLoading, loadingWrapper]
}

export default useLoading
