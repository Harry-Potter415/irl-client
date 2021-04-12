import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getProduct, updateProduct } from 'actions/products'
import StepOne from 'components/products/form/StepOne'
import { handleChange, saveResource } from 'helpers/components'
import { validateProduct } from 'helpers/validations/product'
import { selectProduct } from 'selectors/products'
import StepWizard from 'components/layout/StepWizard'
import FormContainer from 'components/layout/FormContainer'
import FormHeader from 'components/layout/FormHeader'
import ImageUploader from 'components/images/ImageUploader'
import { PRODUCT_FORM_STEPS, UPLOAD_PRODUCT_IMAGE_TEXT } from 'lib/constants'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class UpdateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: props.product,
      errors: {},
      currentStep: 0,
    }

    this.handleNextStep = this.handleNextStep.bind(this)
    this.handlePreviousStep = this.handlePreviousStep.bind(this)
    this.handleChange = handleChange.bind(this, 'product')
    this.handleSave = saveResource.bind(this, {
      resourceName: 'product',
      validateFunction: validateProduct,
      action: props.updateProduct,
      message: 'Successfully updated product',
      history: props.history,
      urlPrefix: '',
    })

    this.subtitle = 'Edit product'
  }

  componentDidMount() {
    const { getProduct } = this.props
    const { id } = this.props.match.params
    getProduct(id)
  }

  componentWillReceiveProps(newProps) {
    const { product, getProduct } = newProps
    const { id } = newProps.match.params
    if (!product) getProduct(id)
    if (!this.state.product) this.setState({ product: newProps.product })
  }

  renderCurrentStep() {
    const { product, currentStep, errors } = this.state
    switch (PRODUCT_FORM_STEPS[currentStep]) {
      case 'step_1':
        return (
          <StepOne
            handleChange={this.handleChange}
            product={product}
            errors={errors}
            subtitle={this.subtitle}
          />
        )
      case 'image_upload':
        return (
          <FormContainer>
            <FormHeader title="Add Product Hero Image" subtitle={this.subtitle} />
            <ImageUploader
              imageUrl={product.imageUrl}
              folder="products"
              id={UPLOADER_ID}
              detailsText={UPLOAD_PRODUCT_IMAGE_TEXT}
              onImageUpload={e => {
                this.handleChange(e, { imageUploader: true, field: 'imageUrl' })
              }}
            />
          </FormContainer>
        )
      default:
        return <StepOne handleChange={this.handleChange} product={product} errors={errors} />
    }
  }

  handleNextStep() {
    const { product, currentStep } = this.state

    const validate = validateProduct(product)
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
    const { product, currentStep } = this.state
    const { isUploading } = this.props
    if (!product) return null

    return (
      <Fragment>
        {this.renderCurrentStep()}

        <StepWizard
          steps={PRODUCT_FORM_STEPS}
          currentStep={currentStep + 1}
          previousDisabled={currentStep === 0}
          nextDisabled={isUploading}
          onNext={
            currentStep === PRODUCT_FORM_STEPS.length - 1 ? this.handleSave : this.handleNextStep
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
      getProduct,
      updateProduct,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const product = selectProduct(state, id)
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    product,
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(UpdateProduct)))
