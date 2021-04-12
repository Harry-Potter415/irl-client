import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteButton from 'components/layout/DeleteButton'
import { globalStyles } from 'components/globalStyles'
import styled from 'styled-components'

const DeleteImage = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  ${props => props.theme.breakpoints.up('md')} {
    position: absolute;
    top: 5rem;
    right: ${globalStyles.content.padding}px;
  }
  .deleteText {
    position: relative;
    top: -3px;
  }
`

class DeleteImageButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <DeleteImage onClick={onClick} className="delete-image-button">
        <DeleteButton deleteText="Delete Image" />
      </DeleteImage>
    )
  }
}

DeleteImageButton.propTypes = {
  onClick: PropTypes.func,
}

export default DeleteImageButton
