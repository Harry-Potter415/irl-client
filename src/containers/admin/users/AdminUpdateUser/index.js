import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getUser, updateUser } from 'actions/admin/users'
import Form from 'components/layout/Form'
import UserForm from 'containers/users/UserForm'
import { validateUpdateUser } from 'helpers/validations/user'
import { isLoaded } from 'helpers/components'
import { selectUser } from 'selectors/admin/users'

class AdminUpdateUser extends Component {
  componentDidMount() {
    const { getUser } = this.props
    const { id } = this.props.match.params
    getUser(id)
  }

  render() {
    const { user, updateUser } = this.props
    if (!isLoaded(user)) return null

    return (
      <Form
        initialValues={user}
        resourceName="user"
        title="Edit User"
        message="Successfully updated user"
        validateFunction={validateUpdateUser}
        action={updateUser}
        saveText="Update"
        urlPrefix="/admin"
        callback={() => {
          this.props.history.push('/admin/users')
        }}
      >
        {(handleChange, user, errors) => (
          <UserForm handleChange={handleChange} user={user} errors={errors} />
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser,
      updateUser,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const user = selectUser(state, id)
  return {
    user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminUpdateUser)))
