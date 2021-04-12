import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StepIcon } from '@material-ui/core'
import styled from 'styled-components'

import { PRIMARY_GREEN } from 'lib/colors'
import RoadSignIcon from 'icons/RoadSignIcon'
import PropertyIcon from 'icons/PropertyIcon'
import MapMarkerIcon from 'icons/MapMarkerIcon'
import ReviewIcon from 'icons/ReviewIcon'
import CheckIcon from 'icons/CheckIcon'
import CampaignIcon from 'icons/CampaignIcon'
import ListIcon from 'icons/ListIcon'
import TargetIcon from 'icons/TargetIcon'
import PictureIcon from 'icons/PictureIcon'

class StepWizardIcon extends Component {
  getStepIcon(icon) {
    switch (icon) {
      case 'user_type':
        return RoadSignIcon
      case 'property_types':
        return PropertyIcon
      case 'cities':
        return MapMarkerIcon
      case 'signup_details':
        return ReviewIcon
      case 'campaign_step_1':
        return CampaignIcon
      case 'campaign_step_2':
        return ListIcon
      case 'campaign_step_3':
        return TargetIcon
      case 'image_upload':
        return PictureIcon
      case 'product_step_1':
        return ReviewIcon
      case 'property_step_1':
        return ReviewIcon
      default:
        return StepIcon
    }
  }

  render() {
    const { step, index, currentStep } = this.props

    const key = typeof step == 'string' ? step : step.stepperIcon

    let Icon = this.getStepIcon(key)

    if (index + 1 < currentStep) {
      Icon = CheckIcon
    }

    const StyledIcon = styled(Icon)`
      transform: scale(1.5);
      &.highlighted path {
        color: ${PRIMARY_GREEN};
      }
      path {
        color: #b4b4b4;
      }
    `
    return (
      <StyledIcon
        icon={index + 1}
        active={currentStep === index + 1}
        completed={currentStep > index + 1}
        className={index + 1 <= currentStep ? 'highlighted' : null}
      />
    )
  }
}

StepWizardIcon.propTypes = {
  step: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
}

export default StepWizardIcon
