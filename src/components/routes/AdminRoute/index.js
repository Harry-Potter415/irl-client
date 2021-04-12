import React, { Component } from 'react'
import * as authActions from '../../../actions/auth'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'

class AdminRoute extends Component {
  render() {
    const { authenticated, authToken } = this.props
    const { component: Component, redirect, ...rest } = this.props
    let pathname = redirect ? redirect : '/login'
    let decoded
    let isAdmin
    if (authToken) {
      decoded = jwtDecode(authToken)
      isAdmin = decoded.is_admin
    }
    return (
      <Route
        {...rest}
        render={props =>
          authenticated === true && isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: pathname,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMe: () => dispatch(authActions.fetchMe()),
  }
}

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
)(AdminRoute)
