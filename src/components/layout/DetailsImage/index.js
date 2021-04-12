import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { detailsImage } from 'helpers/cloudinary'
import ImageStepper from 'components/layout/ImageStepper'

const ImageGrid = styled(Grid)`
  flex-grow: 1;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  @media (max-width: 960px) {
    min-height: auto;
  }
`

class DetailsImage extends Component {
  render() {
    const { imageUrl, images } = this.props
    return (
      <ImageGrid item md={6}>
        <ImageContainer>
          {images ? (
            <ImageStepper
              images={
                images.length > 0 ? images.map(image => detailsImage(image)) : [detailsImage(null)]
              }
            />
          ) : (
            <Image src={detailsImage(imageUrl)} />
          )}
        </ImageContainer>
      </ImageGrid>
    )
  }
}

export default DetailsImage
