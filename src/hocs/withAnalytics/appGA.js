/** @file
 *  Google analytics for the app part (as opposed to the shopify part)
 */

import ReactGA from 'react-ga'

// const trackerName = 'ExtraApp'
let isInitialized = false

export const initialize = () => {
  const gaId = process.env.REACT_APP_GA_ID
  if (!gaId) {
    console.warn('GA tracker ID missing (env vars)')
    return
  }
  ReactGA.initialize(gaId, {
    debug: false,
    // gaOptions: { name: trackerName },
  })
  isInitialized = true
}

export const trackPageView = () =>
  isInitialized && ReactGA.pageview(window.location.pathname + window.location.search)

export const trackEvent = payload => isInitialized && ReactGA.event(payload /* , [trackerName] */)
