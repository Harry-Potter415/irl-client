import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showAlertError, showAlertSuccess, showAlertWarning } from '../../actions/alerts'

export const withAlerts = WrappedComponent => {
  class HOC extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    showAlertError: msg => dispatch(showAlertError(msg)),
    showAlertWarning: msg => dispatch(showAlertWarning(msg)),
    showAlertSuccess: msg => dispatch(showAlertSuccess(msg)),
  })

  return connect(
    null,
    mapDispatchToProps
  )(HOC)
}
