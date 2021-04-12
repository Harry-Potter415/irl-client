import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { createUser } from 'actions/admin/users'
import UserForm from 'components/users/UserForm'
import Form from 'components/layout/Form'
import { validateUser } from 'helpers/validations/user'

class AdminCreateUser extends Component {
  render() {
    const { createUser } = this.props

    return (
      <Form
        resourceName="user"
        title="Create a New User"
        message="Successfully created user"
        validateFunction={validateUser}
        action={createUser}
        saveText="Create"
        urlPrefix="/admin"
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
      createUser,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(AdminCreateUser))
