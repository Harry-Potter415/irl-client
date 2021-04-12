import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditIcon from 'icons/EditIcon'

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`
const LinkText = styled.span`
  padding-left: 5px;
`

class EditButton extends Component {
  render() {
    const { url } = this.props
    return (
      <StyledLink to={url}>
        <EditIcon />
        <LinkText>Edit</LinkText>
      </StyledLink>
    )
  }
}

export default EditButton
