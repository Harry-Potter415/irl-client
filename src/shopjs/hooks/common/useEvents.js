/* global CustomEvent */
import { useCallback, useState } from 'react'

// Pub/Sub
const useEvents = () => {
  const [element] = useState(document.getElementById('root'))

  const subscribe = useCallback((eventName, cb) => element.addEventListener(eventName, cb), [
    element,
  ])

  const unsubscribe = useCallback((eventName, cb) => element.removeEventListener(eventName, cb), [
    element,
  ])

  const dispatch = useCallback(
    (eventName, data) => element.dispatchEvent(new CustomEvent(eventName, { detail: data })),
    [element]
  )

  return [{ subscribe, unsubscribe, dispatch }]
}

export default useEvents
