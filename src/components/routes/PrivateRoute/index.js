import React, { Component } from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from 'jwt-decode'
import { setSidebarDisabled } from 'actions/layout'

class PrivateRoute extends Component {
  render() {
    const { authenticated, authToken, userType, setSidebarDisabled } = this.props
    const { component: Component, fallback: Fallback, redirect, ...rest } = this.props
    let pathname = redirect ? redirect : '/'
    let isAllowed = false
    if (authToken) {
      const decoded = jwtDecode(authToken)
      isAllowed = userType ? userType === decoded.user_type : true
    }
    if (authenticated && isAllowed) {
      return <Route {...rest} render={props => <Component {...props} />} />
    } else if (Fallback) {
      setSidebarDisabled()
      return <Route {...rest} render={props => <Fallback {...props} />} />
    } else {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: pathname,
                state: { from: props.location },
              }}
            />
          )}
        />
      )
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSidebarDisabled,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { authenticated, authToken } = state.auth
  return {
    authenticated,
    authToken,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
