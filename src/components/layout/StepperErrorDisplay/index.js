import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const ErrorMessage = styled(Typography)`
  text-align: center;
`

class StepWizardIcon extends Component {
  getError(target, errors) {
    return errors[target] || null
  }

  render() {
    const { targetError, errors } = this.props

    const error = this.getError(targetError, errors)

    return (
      <ErrorMessage variant="caption" color="error">
        {error}
      </ErrorMessage>
    )
  }
}

StepWizardIcon.propTypes = {
  targetError: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
}

export default StepWizardIcon
