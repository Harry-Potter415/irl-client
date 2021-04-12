import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseCircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'

import BaseModal from 'components/modals/Modal'

const Modal = styled(BaseModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CircularProgress = styled(BaseCircularProgress)`
  outline: none; // Dont know why this is neccesary but it is :-(
`

class Loader extends Component {
  render() {
    const { isLoading, size, ...rest } = this.props

    return (
      <Modal open={isLoading} hideBackdrop {...rest}>
        <CircularProgress size={size} />
      </Modal>
    )
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number,
}

Loader.defaultProps = {
  isLoading: false,
  size: 80,
}

export default Loader
