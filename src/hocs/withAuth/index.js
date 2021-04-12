import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMe, logoutUser } from 'actions/auth'

export const withAuth = WrappedComponent => {
  class HOC extends Component {
    componentDidMount() {
      const { authenticated, fetchMe } = this.props
      if (authenticated) {
        fetchMe()
      }
    }

    render() {
      const { currentUser, logoutUser } = this.props
      return <WrappedComponent currentUser={currentUser} logoutUser={logoutUser} {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const { authenticated, currentUser } = state.auth
    return {
      authenticated,
      currentUser,
    }
  }

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        fetchMe,
        logoutUser,
      },
      dispatch
    )

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOC)
}
