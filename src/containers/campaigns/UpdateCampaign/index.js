import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, updateCampaign } from 'actions/campaigns'
import { validateCampaign, validateCampaignStep } from 'helpers/validations/campaign'
import { selectCampaign } from 'selectors/campaigns'
import { handleChange, saveResource } from 'helpers/components'
import StepOne from 'components/campaigns/form/StepOne'
import StepTwo from 'components/campaigns/form/StepTwo'
import StepThree from 'components/campaigns/form/StepThree'
import ImageUploader from 'components/images/ImageUploader'
import FormContainer from 'components/layout/FormContainer'
import FormHeader from 'components/layout/FormHeader'
import StepWizard from 'components/layout/StepWizard'
import { CAMPAIGN_FORM_STEPS, UPLOAD_CAMPAIGN_IMAGE_TEXT } from 'lib/constants'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class UpdateCampaign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campaign: props.campaign,
      errors: {},
      currentStep: 0,
    }

    this.handleNextStep = this.handleNextStep.bind(this)
    this.handlePreviousStep = this.handlePreviousStep.bind(this)
    this.handleChange = handleChange.bind(this, 'campaign')

    this.handleSave = saveResource.bind(this, {
      resourceName: 'campaign',
      validateFunction: validateCampaign,
      action: props.updateCampaign,
      message: 'Successfully created placement',
      history: props.history,
      urlPrefix: '',
      callback: data => this.props.history.push(`/placements/${data.id}`),
    })

    this.subtitle = 'Edit placement'
  }

  componentDidMount() {
    const { getCampaign } = this.props
    const { id } = this.props.match.params
    getCampaign(id)
  }

  componentWillReceiveProps(newProps) {
    const { campaign, getCampaign } = newProps
    const { id } = newProps.match.params
    if (!campaign) getCampaign(id)
    if (!this.state.campaign) this.setState({ campaign: newProps.campaign })
  }

  renderCurrentStep() {
    const { campaign, currentStep, errors } = this.state
    switch (CAMPAIGN_FORM_STEPS[currentStep]) {
      case 'campaign_step_1':
        return (
          <StepOne
            handleChange={this.handleChange}
            campaign={campaign}
            errors={errors}
            subtitle={this.subtitle}
          />
        )
      case 'campaign_step_2':
        return (
          <StepTwo
            handleChange={this.handleChange}
            campaign={campaign}
            errors={errors}
            subtitle={this.subtitle}
          />
        )
      case 'campaign_step_3':
        return (
          <StepThree
            handleChange={this.handleChange}
            campaign={campaign}
            errors={errors}
            subtitle={this.subtitle}
          />
        )
      case 'image_upload':
        return (
          <FormContainer>
            <FormHeader subtitle={this.subtitle} title="Add Placement Hero Image" />
            <ImageUploader
              imageUrl={campaign.imageUrl}
              folder="campaigns"
              id={UPLOADER_ID}
              detailsText={UPLOAD_CAMPAIGN_IMAGE_TEXT}
              onImageUpload={e => {
                this.handleChange(e, { imageUploader: true, field: 'imageUrl' })
              }}
            />
          </FormContainer>
        )
      default:
        return <StepOne handleChange={this.handleChange} campaign={campaign} errors={errors} />
    }
  }

  handleNextStep() {
    const { campaign, currentStep } = this.state
    const validate = validateCampaignStep(currentStep, campaign)

    if (validate.isValid) {
      this.setState({ currentStep: currentStep + 1 })
    } else {
      this.setState({ errors: validate.errors })
    }
  }

  handlePreviousStep() {
    const { currentStep } = this.state
    if (currentStep > 0) {
      this.setState({ currentStep: currentStep - 1 })
    }
  }

  render() {
    const { campaign, currentStep } = this.state
    const { isUploading } = this.props
    if (!campaign) return null

    return (
      <Fragment>
        {this.renderCurrentStep()}

        <StepWizard
          steps={CAMPAIGN_FORM_STEPS}
          currentStep={currentStep + 1}
          previousDisabled={currentStep === 0}
          nextDisabled={isUploading}
          onNext={
            currentStep === CAMPAIGN_FORM_STEPS.length - 1 ? this.handleSave : this.handleNextStep
          }
          onPrevious={this.handlePreviousStep}
        />
      </Fragment>
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
)(withRouter(withAlerts(UpdateCampaign)))
