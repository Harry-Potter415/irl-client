import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { scaledImageByWidth, getCloudinaryImageUrl } from 'helpers/cloudinary'

const processBackgroundImage = (processImageCb = url => url) => ({ src, darken }) =>
  `linear-gradient( rgba(0, 0, 0, ${darken}), rgba(0, 0, 0, ${darken}) ), url("${processImageCb(
    src
  )}")`

const Image = styled.div`
  width: 100%;
  height: auto;
  min-height: 240px;
  background-image: ${processBackgroundImage()};
  @media (max-width: 960px) {
    background-image: ${processBackgroundImage(src => scaledImageByWidth(src, 960))};
  }
  @media (max-width: 600px) {
    background-image: ${processBackgroundImage(src => scaledImageByWidth(src, 600))};
  }
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const ContentWrapper = styled.div`
  width: 100%;
`

const HeroImage = ({
  url,
  children,
  style,
  darken = 0,
  optimizeSize = true,
  useCloudinaryRelativeUrl = true,
}) => (
  <Image
    src={useCloudinaryRelativeUrl ? getCloudinaryImageUrl(url) : url}
    style={style}
    darken={darken}
    optimizeSize={optimizeSize}
  >
    <ContentWrapper>{children}</ContentWrapper>
  </Image>
)

HeroImage.propTypes = {
  url: PropTypes.string.isRequired,
  darken: PropTypes.number,
  style: PropTypes.object,
  optimizeSize: PropTypes.bool,
  useCloudinaryRelativeUrl: PropTypes.bool,
}

export default HeroImage
