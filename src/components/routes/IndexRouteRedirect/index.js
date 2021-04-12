import React, { Component } from 'react'
import * as authActions from '../../../actions/auth'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { HOME_PAGE, USER_TYPES } from 'lib/constants'
import HostLanding from 'containers/host/HostLanding'
import PrivateRoute from 'components/routes/PrivateRoute'

class PrivateIndexRouteRedirect extends Component {
  render() {
    const { authenticated, publicTo, authToken } = this.props
    if (authenticated) {
      const decoded = jwtDecode(authToken)
      const userType = decoded.user_type
      if (userType === USER_TYPES.host) {
        return <PrivateRoute userType={USER_TYPES.host} path="/" component={HostLanding} exact />
      }
      return <Redirect to={HOME_PAGE[userType]} />
    } else {
      return <Redirect to={publicTo} />
    }
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
)(PrivateIndexRouteRedirect)
