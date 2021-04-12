import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { selectCurrentUser } from 'selectors/auth'
import PropTypes from 'prop-types'
import Sync from 'react-select'
import styled from 'styled-components'
import CheckboxInput from 'components/inputs/CheckboxInput'
import TextInput from 'components/inputs/TextInput'
import { buildOptions, loadCityOptions } from 'helpers/react-select'
import { SIGNUP_OPTIONS } from 'lib/constants'
import ReactSelect, { SELECT_TYPES } from 'components/inputs/ReactSelect'
import { SOCIAL_MEDIA_NAMES, isAdmin } from 'helpers/user'
import { buildUserTypeOption } from 'helpers/react-select'
import { USER_TYPES } from 'config'
import AdminUploader from 'components/admin/AdminUploader'
import ImageUploader from 'components/images/ImageUploader'
import uniqueId from 'lodash/uniqueId'

const SectionLabel = styled.div`
  color: #372e2e;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  line-height: 18px;
  text-transform: uppercase;
  margin: 20px 0 10px;
`
const UPLOADER_ID = uniqueId()

class UserForm extends Component {
  render() {
    const { user, handleChange, errors, currentUser } = this.props

    return user ? (
      <Fragment>
        <TextInput
          label="Name"
          name="name"
          value={user.name}
          handleChange={handleChange}
          error={errors.name}
        />
        <TextInput
          label="Email"
          name="email"
          value={user.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <TextInput
          label="Company"
          name="company"
          value={user.company}
          handleChange={handleChange}
          error={errors.company}
        />
        {isAdmin(currentUser) && (
          <CheckboxInput
            label="Admin"
            name="isAdmin"
            value={user.isAdmin}
            handleChange={handleChange}
            error={errors.isAdmin}
            options={[{ text: 'Yes', value: true }, { text: 'No', value: false }]}
          />
        )}
        {isAdmin(currentUser) && (
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
        )}
        {user.userType === 'host' && (
          <Fragment>
            <TextInput
              label="Description"
              name="description"
              multiline={true}
              value={user.description}
              handleChange={handleChange}
              error={errors.description}
            />
            <ReactSelect
              isMulti
              defaultValue={buildOptions(user.cities)}
              hasValue={!!(user.cities && user.cities.length)}
              label="Cities"
              name="cities"
              loadOptions={loadCityOptions}
              handleChange={e => {
                handleChange(e, { reactSelect: true, field: 'cities', isMulti: true })
              }}
              error={errors.cities}
            />
            <SectionLabel>Audience</SectionLabel>
            <TextInput
              label="Average daily rate"
              name="averageDailyRate"
              value={user.averageDailyRate}
              handleChange={handleChange}
              error={errors.averageDailyRate}
              type="number"
            />
            <TextInput
              label="Number of Rooms"
              name="totalRooms"
              value={user.totalRooms}
              handleChange={handleChange}
              error={errors.totalRooms}
              type="number"
            />
            <ReactSelect
              isMulti="true"
              label="Audience"
              name="audience"
              defaultValue={buildOptions(user.audience)}
              options={SIGNUP_OPTIONS.audiences}
              SelectComponent={Sync}
              hasValue={user.audience && user.audience.length > 0}
              handleChange={e => {
                handleChange(e, {
                  reactSelect: true,
                  field: 'audience',
                  isMulti: true,
                })
              }}
            />
            <ReactSelect
              isMulti="true"
              label="Age Group"
              name="ageGroup"
              defaultValue={buildOptions(user.ageGroup)}
              options={SIGNUP_OPTIONS.ageGroups}
              SelectComponent={Sync}
              hasValue={user.ageGroup && user.ageGroup.length > 0}
              handleChange={e => {
                handleChange(e, {
                  reactSelect: true,
                  field: 'ageGroup',
                  isMulti: true,
                })
              }}
            />
            <SectionLabel>Social media links</SectionLabel>
            {SOCIAL_MEDIA_NAMES.map(socialMediaName => (
              <TextInput
                // capitalize the first letter in the label:
                label={socialMediaName.charAt(0).toUpperCase() + socialMediaName.slice(1)}
                name={socialMediaName}
                value={user[socialMediaName]}
                handleChange={handleChange}
                error={errors[socialMediaName]}
              />
            ))}
          </Fragment>
        )}
        <AdminUploader label="Logo">
          <ImageUploader
            imageUrl={user.logoUrl}
            folder="users"
            id={UPLOADER_ID}
            onImageUpload={e => {
              handleChange(e, { imageUploader: true, field: 'logoUrl' })
            }}
          />
        </AdminUploader>
      </Fragment>
    ) : null
  }
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(UserForm)
