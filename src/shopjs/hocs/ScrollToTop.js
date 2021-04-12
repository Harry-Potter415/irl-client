/* global requestAnimationFrame */
import React, { Fragment, useState, useLayoutEffect, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// Scroll to top on route change
const ScrollToTop = props => {
  const [location, setLocation] = useState(props.location)

  useEffect(() => {
    setLocation(props.location)
  }, [props.location])

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })
  }, [location])

  return <Fragment>{props.children}</Fragment>
}

export default withRouter(ScrollToTop)
