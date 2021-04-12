import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dialog from 'components/modals/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import XIcon from 'icons/XIcon'

const Close = styled(XIcon)`
  color: ${props => props.theme.palette.textColor.secondary};
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`

class ModalContainer extends Component {
  render() {
    const { open, onClose } = this.props
    return (
      <Dialog
        aria-labelledby="New Address Modal"
        aria-describedby="Creates a new address"
        open={open}
        onClose={onClose}
      >
        <Close onClick={onClose} />
        <DialogContent>{this.props.children}</DialogContent>
      </Dialog>
    )
  }
}

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

ModalContainer.defaultProps = {
  open: false,
  onClose: () => {},
}

export default ModalContainer
