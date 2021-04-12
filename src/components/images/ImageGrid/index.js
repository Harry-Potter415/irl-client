import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { gridImage } from 'helpers/cloudinary'

const Images = styled(Grid)`
  margin-top: 1rem;
`
const Image = styled(Grid)`
  padding: 2px;
  img {
    max-width: 100%;
    height: auto;
  }
`

class ImageGrid extends Component {
  render() {
    const { images } = this.props
    return (
      <Images container>
        {images.map(image => {
          return (
            <Image item md={3}>
              <img src={gridImage(image.url)} alt={image.name} />
            </Image>
          )
        })}
      </Images>
    )
  }
}

ImageGrid.propTypes = {
  images: PropTypes.array,
}

export default ImageGrid
