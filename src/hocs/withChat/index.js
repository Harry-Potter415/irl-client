import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Intercom from 'react-intercom'
import { INTERCOM_APP_ID } from 'config'
import { selectCurrentUser } from 'selectors/auth'

const withChat = WrappedComponent => {
  const HOC = props => {
    const { currentUser } = props
    const intercomUser = currentUser
      ? {
          user_id: currentUser.id,
          email: currentUser.attributes.email,
          name: currentUser.attributes.name,
          user_type: currentUser.attributes.userType,
        }
      : {}

    const shouldDisplay =
      process.env.NODE_ENV !== 'development' && window.location.host.includes('staging')
    return (
      <Fragment>
        <WrappedComponent {...props} />
        {shouldDisplay && <Intercom appID={INTERCOM_APP_ID} {...intercomUser} />}
      </Fragment>
    )
  }

  const mapStateToProps = state => {
    return {
      currentUser: selectCurrentUser(state),
    }
  }

  return connect(mapStateToProps)(HOC)
}

export default withChat
