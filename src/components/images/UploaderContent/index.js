import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'
import { Typography } from '@material-ui/core'
import CropOriginalIcon from '@material-ui/icons/CropOriginal'
import SyncIcon from '@material-ui/icons/Sync'
import { theme } from 'components/theme'
import CheckIcon from 'icons/CheckIcon'

const COLORS = {
  background: {
    default: theme.palette.grey[250],
    active: theme.palette.background.active,
    uploading: theme.palette.background.active,
    uploaded: theme.palette.success.light,
  },
  border: {
    default: theme.palette.grey[450],
    active: theme.palette.primary.light,
    uploading: theme.palette.primary.light,
    uploaded: theme.palette.success.main,
  },
  icon: {
    default: theme.palette.grey[450],
    active: theme.palette.primary.light,
    uploading: theme.palette.primary.light,
    uploaded: theme.palette.success.main,
  },
}
const ICONS = {
  default: CropOriginalIcon,
  active: CropOriginalIcon,
  uploading: SyncIcon,
  uploaded: CheckIcon,
}

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => COLORS.background[props.state]};
  border: 2px dashed ${props => COLORS.border[props.state]};
  padding: 0 2rem;
  text-align: center;
`
const StyledIcon = styled.div`
  .icon {
    color: ${props => COLORS.icon[props.state]} !important;
    width: 3rem !important;
    height: 3rem !important;
    margin-bottom: 1rem;
    animation: ${props =>
      props.state === 'uploading'
        ? css`
            ${spin} 2s linear 0s infinite
          `
        : 'initial'};
  }
`
const Action = styled.span`
  color: ${props => props.theme.palette.primary.main};
  cursor: pointer;
`
const DetailsText = styled(Typography)`
  margin-top: 0.5rem !important;
  color: ${props => props.theme.palette.text.secondary} !important;
`

class UploaderContent extends Component {
  render() {
    const { state, text, action, detailsText } = this.props
    const Icon = ICONS[state]
    return (
      <Content state={state}>
        <StyledIcon state={state}>{<Icon className="icon" />}</StyledIcon>
        <Typography variant="caption" gutterBottom>
          {text} {action && <Action>{action}</Action>}
        </Typography>
        <DetailsText variant="body1" gutterBottom>
          {detailsText}
        </DetailsText>
      </Content>
    )
  }
}

UploaderContent.propTypes = {
  state: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.string,
}

export default UploaderContent
