import React, { Fragment } from 'react'
import FormHeader from 'components/layout/FormHeader'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import { SIGNUP_OPTIONS } from 'lib/constants'
import Sync from 'react-select'
import { buildOptions } from 'helpers/react-select'

const PropertyDetails = ({ handleChange, title, subtitle, user, errors }) => (
  <Fragment>
    <FormHeader title={title} subtitle={subtitle} />
    <TextInput
      label="Average Daily Rate"
      name="averageDailyRate"
      type="number"
      value={user.averageDailyRate}
      handleChange={handleChange}
      error={errors.averageDailyRate}
    />
    <TextInput
      label="Total rooms / spaces"
      name="totalRooms"
      type="number"
      value={user.totalRooms}
      handleChange={handleChange}
      error={errors.totalRooms}
    />
    <ReactSelect
      isMulti="true"
      label="Age Group"
      name="ageGroup"
      options={SIGNUP_OPTIONS.ageGroups}
      SelectComponent={Sync}
      hasValue={user.ageGroup && user.ageGroup.length > 0}
      error={errors.ageGroup}
      defaultValue={buildOptions(user.ageGroup)}
      handleChange={e => {
        handleChange(e, {
          reactSelect: true,
          field: 'ageGroup',
          isMulti: true,
        })
      }}
    />
    <ReactSelect
      isMulti="true"
      label="Audience"
      name="audience"
      options={SIGNUP_OPTIONS.audiences}
      SelectComponent={Sync}
      hasValue={user.audience && user.audience.length > 0}
      defaultValue={buildOptions(user.audience)}
      error={errors.audience}
      handleChange={e => {
        handleChange(e, {
          reactSelect: true,
          field: 'audience',
          isMulti: true,
        })
      }}
    />
  </Fragment>
)

PropertyDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default PropertyDetails
