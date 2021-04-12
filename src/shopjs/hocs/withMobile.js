import React from 'react'
import { withWidth } from '@material-ui/core'

const withMobile = WrappedComponent => {
  const HOC = ({ width: screenWidth, ...props }) => {
    const isMobile = screenWidth === 'xs' ? true : false
    return <WrappedComponent isMobile={isMobile} {...props} />
  }

  return withWidth()(HOC)
}

export default withMobile
