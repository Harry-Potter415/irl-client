import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormContainer from 'components/layout/FormContainer'
import FormHeader from 'components/layout/FormHeader'
import CreateCampaignRules from 'components/campaigns/CreateCampaignRules'

class StepThree extends Component {
  render() {
    let { campaign, handleChange } = this.props
    return (
      <FormContainer md={9}>
        <FormHeader
          subtitle="Create a new placement"
          title="Create Rules and Regulations your host must abide by."
        />
        <CreateCampaignRules campaign={campaign} handleChange={handleChange} />
      </FormContainer>
    )
  }
}

StepThree.propTypes = {
  campaign: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default StepThree
