import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { createCampaign } from 'actions/admin/campaigns'
import CampaignForm from 'components/admin/campaigns/CampaignForm'
import Form from 'components/layout/Form'
import { validateAdminCampaign } from 'helpers/validations/campaign'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminCreateCampaign extends Component {
  render() {
    const { createCampaign, isUploading } = this.props

    return (
      <Form
        resourceName="campaign"
        title="Create a New Placement"
        message="Successfully created placement"
        validateFunction={validateAdminCampaign}
        action={createCampaign}
        saveText="Create"
        urlPrefix="/admin"
        submitDisabled={isUploading}
        callback={data => this.props.history.push(`/admin/placements/${data.id}`)}
      >
        {(handleChange, campaign, errors) => (
          <CampaignForm
            handleChange={handleChange}
            campaign={campaign}
            errors={errors}
            uploaderId={UPLOADER_ID}
          />
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCampaign,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(AdminCreateCampaign))
