import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import CheckboxInput from 'components/inputs/CheckboxInput'
import ReactSelect, { SELECT_TYPES } from 'components/inputs/ReactSelect'
import { buildUserTypeOption } from 'helpers/react-select'
import { USER_TYPES } from 'config'

class UserForm extends Component {
  render() {
    let { user, handleChange, errors } = this.props

    return (
      <div>
        <TextInput
          label="Name"
          name="name"
          value={user.name}
          handleChange={handleChange}
          error={errors.name}
        />
        <TextInput
          label="Company"
          name="company"
          value={user.company}
          handleChange={handleChange}
          error={errors.company}
        />
        <TextInput
          label="Email"
          name="email"
          value={user.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <CheckboxInput
          label="Admin"
          name="isAdmin"
          value={user.isAdmin}
          handleChange={handleChange}
          error={errors.isAdmin}
          options={[{ text: 'Yes', value: true }, { text: 'No', value: false }]}
        />
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={buildUserTypeOption(user.userType, USER_TYPES)}
          hasValue={Boolean(user.userType)}
          label="User Type"
          name="userType"
          options={Object.keys(USER_TYPES).map(type => buildUserTypeOption(type, USER_TYPES))}
          handleChange={e => handleChange(e, { reactSelect: true, field: 'userType' })}
          error={errors.userType}
          SelectComponent={SELECT_TYPES.Sync}
        />
      </div>
    )
  }
}

UserForm.propTypes = {
  user: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

UserForm.defaultProps = {}

export default UserForm
