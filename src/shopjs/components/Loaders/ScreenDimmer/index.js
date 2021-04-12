import React, { useState, useEffect } from 'react'
import { Dimmer } from './styles'

const ScreenDimmer = ({ isLoading }) => {
  const [height, setHeight] = useState({ height: 0 })

  useEffect(() => {
    const handleResize = () => {
      let docHeight = document.height !== undefined ? document.height : document.body.offsetHeight
      setHeight(docHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return isLoading ? <Dimmer height={`${height}px`} /> : null
}

export default ScreenDimmer
