import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Stepper'
import { StepButton, Hidden, Grid } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { selectSidebarOpen, selectSidebarDisabled } from 'selectors/layout'
import StepWizardIcon from 'components/layout/StepWizardIcon'

const BottomBar = styled.div`
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0px;
  right: 0;
  z-index: 1;
  @media (min-width: 600px) {
    padding-left: 90px;

    &.sidebar-open {
      padding-left: 170px;
    }

    &.sidebar-disabled {
      padding-left: 0;
    }
  }
`
const Inner = styled(Grid)`
  border-top: 1px solid ${grey[200]}
  overflow: hidden;
`

const NextButton = styled(Button)`
  width: 100%;
  height: 60px !important;
  padding: 10px 30px !important;
`

const PreviousButton = styled(Button)`
  width: 100%;
  height: 60px !important;
  padding: 10px 30px !important;
`
const StyledStepper = styled(Stepper)`
  padding: 0 !important;
  height: 59px;
`

class StepWizard extends Component {
  render() {
    const {
      steps,
      currentStep,
      previousDisabled,
      nextDisabled,
      onPrevious,
      onNext,
      isSidebarDisabled,
      isSidebarOpen,
    } = this.props
    return (
      <BottomBar
        className={classNames({
          'sidebar-open': isSidebarOpen,
          'sidebar-disabled': isSidebarDisabled,
        })}
      >
        <Grid container spacing={0} justify="space-between">
          <Grid item sm={2} xs={4}>
            <PreviousButton onClick={onPrevious} variant="contained" disabled={previousDisabled}>
              Previous
            </PreviousButton>
          </Grid>
          <Hidden xsDown>
            <Inner item xs={8} center="true">
              <StyledStepper>
                {steps.map((step, i) => (
                  <Step key={i}>
                    <StepButton
                      disabled
                      icon={<StepWizardIcon step={step} index={i} currentStep={currentStep} />}
                    />
                  </Step>
                ))}
              </StyledStepper>
            </Inner>
          </Hidden>
          <Grid item sm={2} xs={4}>
            <NextButton
              onClick={onNext}
              variant="contained"
              color="primary"
              disabled={nextDisabled}
            >
              Next
            </NextButton>
          </Grid>
        </Grid>
      </BottomBar>
    )
  }
}

StepWizard.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  previousDisabled: PropTypes.bool.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
}

StepWizard.defaultProps = {
  steps: [],
  currentStep: 0,
  previousDisabled: true,
  nextDisabled: false,
}

const mapStateToProps = state => {
  return {
    isSidebarOpen: selectSidebarOpen(state),
    isSidebarDisabled: selectSidebarDisabled(state),
  }
}

export default connect(mapStateToProps)(StepWizard)
