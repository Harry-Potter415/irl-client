import React, { Fragment } from 'react'
import FormHeader from 'components/layout/FormHeader'
import ReactSelect from 'components/inputs/ReactSelect'
import PropTypes from 'prop-types'
import { loadCityOptions, buildOptions } from 'helpers/react-select'

const SelectCities = ({ handleChange, title, subtitle, user, errors }) => (
  <Fragment>
    <FormHeader title={title} subtitle={subtitle} />
    <ReactSelect
      isMulti="true"
      label="Cities"
      name="cities"
      loadOptions={loadCityOptions}
      hasValue={user.cities.length > 0}
      defaultValue={buildOptions(user.cities)}
      error={errors.cities}
      handleChange={e => {
        handleChange(e, {
          reactSelect: true,
          field: 'cities',
          isMulti: true,
        })
      }}
    />
  </Fragment>
)

SelectCities.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default SelectCities
