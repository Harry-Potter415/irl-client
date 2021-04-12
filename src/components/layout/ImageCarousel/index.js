import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const Images = styled(Grid)`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 4rem;
`
const Image = styled(Grid)`
  padding: 2px;
  img {
    max-width: 80%;
    height: auto;
    margin-right: -20px;
  }
`
const Removable = styled.span`
  position: absolute;
  padding: 3px;
`

class ImageCarousel extends Component {
  render() {
    const { images, removeImage } = this.props
    if (images.length === 0) return null
    return (
      <Images>
        {images.map((image, index) => {
          return (
            <Image key={index} md={3}>
              <img src={image} alt="" />
              <Removable
                onClick={() => {
                  removeImage(image)
                }}
              >
                x
              </Removable>
            </Image>
          )
        })}
      </Images>
    )
  }
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
}

ImageCarousel.defaultProps = {
  images: [],
}

export default ImageCarousel
