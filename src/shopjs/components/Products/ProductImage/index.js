import React from 'react'
import { Box, Fade } from '@material-ui/core'
import ImageZoom from 'react-medium-image-zoom'

const ProductImage = ({ imageUrl, title, width = '100%', height = '400px' }) => {
  return (
    <Box my={1}>
      <Fade in={true}>
        <ImageZoom
          image={{
            alt: title,
            src: imageUrl,
            style: { width: width },
          }}
          zoomImage={{
            src: imageUrl,
            alt: title,
          }}
        />
      </Fade>
    </Box>
  )
}

export default ProductImage
