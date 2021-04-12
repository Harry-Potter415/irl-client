import React, { Component } from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setSidebarDisabled } from 'actions/layout'

class PublicRoute extends Component {
  render() {
    const { authenticated, setSidebarDisabled, allowAuthenticated } = this.props
    const { component: Component, redirect, ...rest } = this.props
    let pathname = redirect ? redirect : '/'
    if (!authenticated || !window.location.pathname.includes('/shop')) setSidebarDisabled()

    return (
      <Route
        {...rest}
        render={props =>
          authenticated === true && !allowAuthenticated ? (
            <Redirect
              to={{
                pathname: pathname,
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    )
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
  const { authenticated } = state.auth
  return {
    authenticated,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicRoute)
