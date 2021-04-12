import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { withRouter } from 'react-router'
import { handleChange } from 'helpers/components'
import Column from 'components/layout/Column'
import SignupForm from 'components/signup/SignupForm'
import SelectOptions from 'components/signup/SelectOptions'
import SelectCities from 'components/signup/SelectCities'
import PropertyDetails from 'components/signup/PropertyDetails'
import StepWizard from 'components/layout/StepWizard'
import StepperErrorDisplay from 'components/layout/StepperErrorDisplay'
import { signupUser } from 'actions/auth'
import { validateUser, validateSignupStep } from 'helpers/validations/user'
import { setToken } from 'helpers/auth'
import { SIGNUP_OPTIONS, SIGNUP_BRAND_STEPS, SIGNUP_HOST_STEPS } from 'lib/constants'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.renderCurrentStep = this.renderCurrentStep.bind(this)
    this.handlePreviousStep = this.handlePreviousStep.bind(this)
    this.handleNextStep = this.handleNextStep.bind(this)
    this.selectOption = this.selectOption.bind(this)
    this.selectMultipleOptions = this.selectMultipleOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearGenericStepperError = this.clearGenericStepperError.bind(this)
    this.redirectPath = this.redirectPath.bind(this)

    this.state = {
      user: {
        email: null,
        password: null,
        userType: null,
        propertyTypes: [],
        cities: [],
        terms: false,
      },
      errors: {},
      currentStep: 0,
    }
  }

  getSteps(userType) {
    switch (userType) {
      case 'brand':
        return SIGNUP_BRAND_STEPS
      case 'host':
        return SIGNUP_HOST_STEPS
      default:
        return []
    }
  }

  handleChange(e, options) {
    const { currentStep } = this.state
    if (currentStep === 'cities') {
      if (e.length > 0) {
        this.setState({ nextStep: 'details' })
      } else {
        this.setState({ nextStep: null })
      }
    }
    this.clearGenericStepperError()
    handleChange.bind(this, 'user', e, options)()
  }

  redirectPath() {
    switch (this.state.user.userType) {
      case 'brand':
        return '/products/new'
      default:
        return '/'
    }
  }

  handleSubmit = async () => {
    const { history, signupUser, showAlertSuccess } = this.props
    let { user } = this.state
    let validate = validateUser(user)
    if (validate.isValid) {
      try {
        const response = await signupUser(user)
        setToken(response)
        user.password = null
        this.setState({
          user,
        })
        showAlertSuccess('You have successfully created your account')
        history.push(this.redirectPath())
      } catch (e) {}
    } else {
      this.setState({ errors: validate.errors })
    }
  }

  renderCurrentStep = () => {
    const { user, currentStep, errors } = this.state
    const steps = this.getSteps(user.userType)

    if (steps.length === 0) {
      return this.renderInitialStep(user)
    }

    switch (steps[currentStep].key) {
      case 'user_type':
        return this.renderInitialStep(user)
      case 'property_types':
        return (
          <SelectOptions
            title="What type of place are you?"
            subtitle="Let's get acquainted"
            field="propertyTypes"
            selected={user.propertyTypes}
            options={SIGNUP_OPTIONS.propertyTypes}
            onSelect={this.selectMultipleOptions}
          />
        )
      case 'cities':
        return (
          <SelectCities
            title="What cities do you operate in?"
            subtitle="Let's get acquainted"
            user={user}
            errors={errors}
            handleChange={this.handleChange}
          />
        )
      case 'property_details':
        return (
          <PropertyDetails
            title="Tell us about your property"
            subtitle="Let's get acquainted"
            user={user}
            errors={errors}
            handleChange={this.handleChange}
          />
        )
      case 'details':
        return (
          <SignupForm
            user={user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={errors}
          />
        )
      default:
        return this.renderInitialStep(user)
    }
  }

  renderInitialStep(user) {
    return (
      <SelectOptions
        title="What business type are you?"
        subtitle="Let's get acquainted"
        field="userType"
        selected={[user.userType]}
        options={SIGNUP_OPTIONS.userType}
        onSelect={this.selectOption}
      />
    )
  }

  selectOption(field, option) {
    const { user } = this.state
    user[field] = option.value

    this.clearGenericStepperError()

    this.setState({ user })
  }

  selectMultipleOptions(field, option) {
    const { user } = this.state
    const index = user[field].indexOf(option.value)

    if (index > -1) {
      user[field].splice(index, 1)
    } else {
      user[field].push(option.value)
    }

    this.clearGenericStepperError()

    this.setState({ user })
  }

  handlePreviousStep() {
    const { currentStep } = this.state
    this.setState({
      currentStep: currentStep - 1,
    })
  }

  handleNextStep() {
    const { user, currentStep } = this.state
    const validate = validateSignupStep(currentStep, user)
    if (validate.isValid) {
      this.setState({
        user,
        currentStep: currentStep + 1,
        errors: {},
      })
    } else {
      this.setState({ errors: validate.errors })
    }
  }

  clearGenericStepperError() {
    const { errors } = this.state,
      newErrors = { ...errors }

    newErrors.genericStepper = null

    this.setState({
      errors: newErrors,
    })
  }

  render() {
    const { user, currentStep, errors } = this.state
    const steps = this.getSteps(user.userType)

    return (
      <Column>
        <StepperErrorDisplay targetError="genericStepper" errors={errors} />
        {this.renderCurrentStep()}
        <StepWizard
          steps={steps}
          currentStep={currentStep + 1}
          previousDisabled={currentStep === 0}
          onNext={currentStep === steps.length - 1 ? this.handleSubmit : this.handleNextStep}
          onPrevious={this.handlePreviousStep}
        />
      </Column>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ signupUser }, dispatch)

const mapStateToProps = state => {
  const { authenticated } = state.auth
  const { isFetched, isFetching, error } = state.loaders
  return {
    authenticated,
    isFetched,
    isFetching,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(Signup)))
