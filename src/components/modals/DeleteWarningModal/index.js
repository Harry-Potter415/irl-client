import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Dialog from 'components/modals/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { SmallButton } from 'components/layout/SmallButton'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import XIcon from 'icons/XIcon'
import Title from 'components/layout/Title'

const StyledDialogActions = styled(DialogActions)`
  border-top: 1px solid ${props => props.theme.palette.grey[350]};
  padding: 1.5rem;
  margin: 0 !important;
  button {
  }
`
const ConfirmButton = styled(SmallButton)`
  margin-right: 1.5rem !important;
`
const Warning = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.75rem;
`
const WarningText = styled(Typography)`
  font-weight: 800 !important;
`
const Close = styled.span`
  color: ${props => props.theme.palette.textColor.secondary};
  cursor: pointer;
`

class DeleteWarningModal extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
    this.toggleDialog = this.toggleDialog.bind(this)
    this.delete = this.delete.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  toggleDialog() {
    this.setState({ open: !this.state.open })
  }

  delete() {
    const { deleteAction } = this.props
    deleteAction()
    this.toggleDialog()
  }

  onClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <span>
        <Dialog
          maxWidth="xs"
          fullWidth
          aria-labelledby="confirmation-dialog-title"
          onClose={this.onClose}
          open={this.state.open}
        >
          <DialogTitle id="confirmation-dialog-title">
            <Warning>
              <WarningText variant="caption" gutterBottom>
                Warning
              </WarningText>
              <Close onClick={this.onClose}>
                <XIcon />
              </Close>
            </Warning>
            <Title>{this.props.title}</Title>
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this?</Typography>
          </DialogContent>
          <StyledDialogActions>
            <ConfirmButton variant="contained" onClick={this.delete} color="secondary">
              Yes
            </ConfirmButton>
            <SmallButton variant="contained" onClick={this.toggleDialog} color="primary">
              No
            </SmallButton>
          </StyledDialogActions>
        </Dialog>
        <span onClick={this.toggleDialog}>{this.props.children}</span>
      </span>
    )
  }
}

DeleteWarningModal.propTypes = {
  title: PropTypes.string.isRequired,
  deleteAction: PropTypes.func.isRequired,
}

export default DeleteWarningModal
