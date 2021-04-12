import React, { Component } from 'react'
import DeleteWarningModal from 'components/modals/DeleteWarningModal'
import styled from 'styled-components'
import TrashIcon from 'icons/TrashIcon'

const ModalTrigger = styled.div`
  display: flex;
  align-items: center;
`
const LinkText = styled.span`
  padding-left: 5px;
  cursor: pointer;
`
const Delete = styled.span`
  cursor: pointer;
`

class DeleteButton extends Component {
  render() {
    const { title, action, deleteText } = this.props
    return (
      <DeleteWarningModal title={title} deleteAction={action}>
        <ModalTrigger>
          <Delete>
            <TrashIcon />
          </Delete>
          <LinkText className="deleteText">{deleteText}</LinkText>
        </ModalTrigger>
      </DeleteWarningModal>
    )
  }
}

DeleteButton.defaultProps = {
  deleteText: 'Delete',
}

export default DeleteButton
