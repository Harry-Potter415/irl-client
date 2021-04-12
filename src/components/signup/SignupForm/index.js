import React, { Component } from 'react'
import config from 'config'
import Column from 'components/layout/Column'
import FormHeader from 'components/layout/FormHeader'
import { globalStyles } from 'components/globalStyles'
import TextInput from 'components/inputs/TextInput'
import CheckboxInput from 'components/inputs/CheckboxInput'
import { USER_TYPES } from 'lib/constants'

class SignupForm extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    const { handleSubmit } = this.props
    e.preventDefault()
    handleSubmit()
  }

  render() {
    const { user, handleChange, errors } = this.props
    return (
      <div>
        <FormHeader title="We're Extra, what's your name?" subtitle="Let's get acquainted" />
        <Column narrow={true}>
          <form onSubmit={this.onSubmit}>
            <TextInput
              style={globalStyles.top20}
              fullWidth
              name="name"
              value={user.name}
              label="Your name*"
              placeholder="Enter your name"
              handleChange={handleChange}
              variant="outlined"
              error={errors.name}
            />
            {user.userType === USER_TYPES.brand && (
              <TextInput
                label="Company*"
                name="company"
                value={user.company}
                handleChange={handleChange}
                error={errors.company}
              />
            )}

            <TextInput
              style={globalStyles.top20}
              fullWidth
              name="email"
              value={user.email}
              label="Email"
              placeholder="Enter email ..."
              handleChange={handleChange}
              variant="outlined"
              error={errors.email}
            />

            <TextInput
              style={globalStyles.top20}
              fullWidth
              name="password"
              value={user.password}
              label="Password"
              type="password"
              placeholder="Enter password ..."
              handleChange={handleChange}
              variant="outlined"
              error={errors.password}
            />

            <CheckboxInput
              label={
                <span>
                  I agree with{' '}
                  <a target="_blank" rel="noopener noreferrer" href={config.REACT_APP_TOS_URL}>
                    Terms of Service
                  </a>
                  .
                </span>
              }
              name="terms"
              value={user.terms}
              handleChange={handleChange}
              error={errors.terms}
            />

            <button type="submit" style={{ display: 'none' }}></button>
          </form>
        </Column>
      </div>
    )
  }
}

export default SignupForm
