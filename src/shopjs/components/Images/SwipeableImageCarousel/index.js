import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, MobileStepper } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import ImageZoom from 'react-medium-image-zoom'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}))

const SwipeableImageCarousel = ({ images = [], width = '100%', height = '320px' }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const handleStepChange = step => {
    setActiveStep(step)
  }

  const isLoaded = images && images.length > 0

  return (
    <Box className={classes.root}>
      {isLoaded && (
        <Fragment>
          <SwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
            {images.map((src, index) => (
              <Box key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <ImageZoom
                    image={{
                      src: src,
                      style: { width: width },
                    }}
                    zoomImage={{
                      src: src,
                    }}
                  />
                ) : null}
              </Box>
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={<Box />}
            backButton={<Box />}
          />
        </Fragment>
      )}
    </Box>
  )
}

export default SwipeableImageCarousel
