import React from 'react'
import styled from 'styled-components'
import SectionTitle from 'components/layout/FormSectionTitle'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import { Typography, Button, CircularProgress, useMediaQuery } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { theme } from 'components/theme'
import { ProductHit } from 'shopjs/components'

const Section = styled.div`
  margin-bottom: 6rem;
`
const CarouselRow = styled.div`
  margin-top: 1rem;
  height: ${props => props.height}px;
`
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const SeeAllButton = styled(Button)`
  cursor: pointer;
  display: flex;
  white-space: nowrap;
`
const StyledCircularProgress = styled(CircularProgress)`
  && {
    margin-top: 2rem;
  }
`

const Carousel = props => {
  const {
    title,
    text,
    link,
    totalSlides,
    naturalSlideWidth,
    naturalSlideHeight,
    history,
    products,
  } = props

  let visibleSlides = 4
  if (useMediaQuery('@media (max-width: 1000px)')) visibleSlides = 3
  if (useMediaQuery('@media (max-width: 850px)')) visibleSlides = 2
  if (useMediaQuery(theme.breakpoints.down('xs'))) visibleSlides = 1
  const isPlaying = products.length > visibleSlides

  return (
    <Section>
      <SectionTitle text={title} />
      <Details>
        <Typography variant="h5">{text}</Typography>
        <SeeAllButton onClick={() => history.push(link)}>
          See all
          <KeyboardArrowRightIcon />
        </SeeAllButton>
      </Details>
      <CarouselRow height={naturalSlideHeight}>
        {products.length > 0 ? (
          <CarouselProvider
            naturalSlideWidth={naturalSlideWidth}
            naturalSlideHeight={naturalSlideHeight}
            totalSlides={totalSlides}
            isPlaying={isPlaying}
            visibleSlides={visibleSlides}
          >
            <Slider>
              {products.map((product, i) => (
                <Slide key={i}>
                  <ProductHit product={product} />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        ) : (
          <StyledCircularProgress />
        )}
      </CarouselRow>
    </Section>
  )
}

Carousel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  naturalSlideWidth: PropTypes.number,
  naturalSlideHeight: PropTypes.number,
  totalSlides: PropTypes.number,
  history: PropTypes.object,
  products: PropTypes.array,
}

export default withRouter(Carousel)
