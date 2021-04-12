import React from 'react'
import { trackEvent, initialize, trackPageView } from './appGA'

const createReviewTrackingFunction = action => (details = {}) =>
  trackEvent({
    category: 'Reviews',
    action,
    label: `Product=${details.product || 'N/A'}`,
  })

export default WrappedComponent => props => (
  <WrappedComponent
    {...props}
    analytics={{
      initialize,
      trackPageView,
      reviews: {
        visitPage: createReviewTrackingFunction('Reviews - arrive'),
        submitUserData: createReviewTrackingFunction('Reviews - submit user data'),
        visitUserForm: createReviewTrackingFunction('Reviews - see user form'),
        clickRating: createReviewTrackingFunction('Reviews - click rating'),
        rateAtLeastOnce: createReviewTrackingFunction('Reviews - give at least one rating'),
        clickNext: createReviewTrackingFunction('Reviews - click next'),
        clickPrevious: createReviewTrackingFunction('Reviews - click previous'),
      },
    }}
  />
)
