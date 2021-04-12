import React, { Component } from 'react'
import BackIcon from 'icons/BackIcon'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const StyledLink = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const LinkText = styled.span`
  padding-left: 5px;
`

class BackButton extends Component {
  render() {
    const { history } = this.props
    return (
      <StyledLink onClick={history.goBack}>
        <BackIcon />
        <LinkText>Go Back</LinkText>
      </StyledLink>
    )
  }
}

export default withRouter(BackButton)
