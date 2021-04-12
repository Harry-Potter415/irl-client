import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startUpload, finishUpload } from 'actions/uploader'

export const withUploader = WrappedComponent => {
  class HOC extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    startUpload: uploaderId => dispatch(startUpload(uploaderId)),
    finishUpload: uploaderId => dispatch(finishUpload(uploaderId)),
  })

  return connect(
    null,
    mapDispatchToProps
  )(HOC)
}
