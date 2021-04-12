import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, updateCampaign } from 'actions/admin/campaigns'
import { validateAdminCampaign } from 'helpers/validations/campaign'
import Form from 'components/layout/Form'
import CampaignForm from 'components/admin/campaigns/CampaignForm'
import { isLoaded } from 'helpers/components'
import { selectCampaign } from 'selectors/admin/campaigns'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminUpdateCampaign extends Component {
  componentDidMount() {
    const { getCampaign } = this.props
    const { id } = this.props.match.params
    getCampaign(id)
  }

  render() {
    const { campaign, updateCampaign, isUploading } = this.props
    if (!isLoaded(campaign, ['products', 'user'])) return null

    return (
      <Form
        initialValues={campaign}
        resourceName="campaign"
        title="Edit Placement"
        message="Successfully updated placement"
        validateFunction={validateAdminCampaign}
        action={updateCampaign}
        saveText="Update"
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
      getCampaign,
      updateCampaign,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const campaign = selectCampaign(state, id)
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    campaign,
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminUpdateCampaign)))
