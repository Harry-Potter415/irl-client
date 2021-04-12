import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Box, MobileStepper } from '@material-ui/core'
import { ProductItem } from 'shopjs/components'
import SwipeableViews from 'react-swipeable-views'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
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

const SwipeableProductCarousel = ({ products = [], history }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = products.length

  const handleStepChange = step => {
    setActiveStep(step)
  }

  const handleClick = productHandle => {
    history.push(`/shop/products/${productHandle}`)
  }

  const isLoaded = !!products && products.length > 0

  return (
    <Box className={classes.root}>
      {isLoaded && (
        <Box>
          <SwipeableViews
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {products.map((product, index) => (
              <Box key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <ProductItem
                    key={product.id}
                    product={product}
                    className={classes.item}
                    onClick={handleClick}
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
        </Box>
      )}
    </Box>
  )
}

export default withRouter(SwipeableProductCarousel)
