import React from 'react'
import { Box, Fade } from '@material-ui/core'
import { SwipeableImageCarousel, ProductImage } from 'shopjs/components'
import { withMobile } from 'shopjs/hocs'

const ProductImages = ({ visibleImages, isMobile, height = '500px', width: screenWidth }) => {
  return (
    <Box mb={2} display="flex" flexDirection="column">
      {!!isMobile && visibleImages && <SwipeableImageCarousel images={visibleImages} />}

      {!isMobile &&
        !!visibleImages &&
        visibleImages.map((image, i) => (
          <Fade in={true} key={`${i} ${image}`}>
            <ProductImage key={i} imageUrl={image} height={height} />
          </Fade>
        ))}
    </Box>
  )
}

export default withMobile(ProductImages)
