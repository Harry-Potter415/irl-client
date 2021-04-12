import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

const Image = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
  @media (max-width: 960px) {
    min-height: auto;
  }
`

class ImageStepper extends React.Component {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    const { onChange } = this.props
    this.setState(
      prevState => ({
        activeStep: prevState.activeStep + 1,
      }),
      () => {
        onChange && onChange(this.state.activeStep)
      }
    )
  }

  handleBack = () => {
    const { onChange } = this.props
    this.setState(
      prevState => ({
        activeStep: prevState.activeStep - 1,
      }),
      () => {
        onChange && onChange(this.state.activeStep)
      }
    )
  }

  handleStepChange = activeStep => {
    this.setState({ activeStep })
  }

  render() {
    const { classes, theme, images } = this.props
    const { activeStep } = this.state
    const maxSteps = images.length

    return (
      <div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {images.map((image, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? <Image src={image} /> : null}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    )
  }
}

ImageStepper.propTypes = {
  images: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(ImageStepper)
