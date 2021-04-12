import React from 'react'
import { Typography } from '@material-ui/core'

const CustomHighlight = props => {
  const { hit, attribute, variant } = props

  const renderHTML = () => {
    let html = hit._highlightResult[attribute].value
    return { __html: html }
  }

  return (
    <Typography variant={variant}>
      <span dangerouslySetInnerHTML={renderHTML()} />
    </Typography>
  )
}

export default CustomHighlight
