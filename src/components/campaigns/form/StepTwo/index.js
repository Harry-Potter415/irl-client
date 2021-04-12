import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadCityOptions, buildOptions } from 'helpers/react-select'
import FormHeader from 'components/layout/FormHeader'
import SectionTitle from 'components/layout/FormSectionTitle'
import FormContainer from 'components/layout/FormContainer'
import { SIGNUP_OPTIONS } from 'lib/constants'
import Sync from 'react-select'

class StepTwo extends Component {
  render() {
    let { campaign, handleChange, errors } = this.props
    return (
      <FormContainer>
        <FormHeader subtitle="Create a new placement" title="Add Additional Information" />
        <SectionTitle text="Location" />

        <ReactSelect
          isMulti
          onChange={this.handleChange}
          defaultValue={buildOptions(campaign.cities)}
          hasValue={!!(campaign.cities && campaign.cities.length)}
          label="Select Cities"
          name="cities"
          loadOptions={loadCityOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'cities', isMulti: true })
          }}
          error={errors.cities}
        />
        <ReactSelect
          isMulti="true"
          label="Age Group"
          name="ageGroup"
          defaultValue={buildOptions(campaign.ageGroup)}
          options={SIGNUP_OPTIONS.ageGroups}
          SelectComponent={Sync}
          hasValue={campaign.ageGroup && campaign.ageGroup.length > 0}
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
          defaultValue={buildOptions(campaign.audience)}
          options={SIGNUP_OPTIONS.audiences}
          SelectComponent={Sync}
          hasValue={campaign.audience && campaign.audience.length > 0}
          handleChange={e => {
            handleChange(e, {
              reactSelect: true,
              field: 'audience',
              isMulti: true,
            })
          }}
        />
      </FormContainer>
    )
  }
}

StepTwo.propTypes = {
  campaign: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default StepTwo
