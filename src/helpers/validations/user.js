import { Validator } from './validator'
import { isEmail, notEmpty, minLength, isTruthy, isPositive, isWebsiteUrl } from './validate'
import { USER_TYPES } from 'lib/constants'
import { SOCIAL_MEDIA_NAMES } from 'helpers/user'

const SIGNUP_STEP_VALIDATIONS = {
  0: user => {
    const validator = new Validator()
    validator.validateField(user, 'userType', notEmpty, 'User Type is required')
    return validator.result()
  },
}

const HOST_STEP_VALIDATIONS = {
  1: user => {
    const validator = new Validator()
    validator.validateField(user, 'propertyTypes', notEmpty, 'Property Types is required')
    return validator.result()
  },
  2: user => {
    const validator = new Validator()
    validator.validateField(user, 'cities', notEmpty, 'Cities is required')
    return validator.result()
  },
  3: user => {
    const validator = new Validator()
    validator.validateField(user, 'averageDailyRate', notEmpty, 'Average Daily Rate is required')
    validator.validateField(user, 'ageGroup', notEmpty, 'Age Group is required')
    validator.validateField(user, 'totalRooms', notEmpty, 'Total Rooms is required')
    validator.validateField(user, 'audience', notEmpty, 'Audience is required')
    return validator.result()
  },
}

export const validateUser = user => {
  const validator = new Validator()
  validator.validateField(user, 'name', notEmpty, 'Name is required')
  validator.validateField(user, 'email', notEmpty, 'Email is required')
  validator.validateField(
    user,
    'email',
    minLength.bind(null, 4),
    'Email must be at least 4 characters'
  )
  validator.validateField(user, 'email', isEmail, 'Email is not valid')
  validator.validateField(user, 'password', notEmpty, 'Password is required')
  validator.validateField(
    user,
    'password',
    minLength.bind(null, 4),
    'Password must be at least 4 characters'
  )
  validator.validateField(user, 'terms', isTruthy, 'Please agree to the terms')
  if (user.userType === USER_TYPES.brand) {
    validator.validateField(user, 'company', notEmpty, 'Company is required')
  }
  return validator.result()
}

export const validateSignupStep = (step, user) => {
  let validate
  if (step === 0) {
    validate = SIGNUP_STEP_VALIDATIONS[step](user)
  } else if (user.userType === USER_TYPES.host) {
    validate = HOST_STEP_VALIDATIONS[step](user)
  }
  if ([0, 1].includes(step) && !validate.isValid) {
    validate.errors.genericStepper = 'Please make a selection'
  }
  return validate
}

export const validateUpdateUser = user => {
  const validator = new Validator()
  validator.validateField(user, 'name', notEmpty, 'Name is required')
  validator.validateField(user, 'email', notEmpty, 'Email is required')
  validator.validateField(
    user,
    'email',
    minLength.bind(null, 4),
    'Email must be at least 4 characters'
  )
  validator.validateField(user, 'email', isEmail, 'Email is not valid')
  validator.validateField(user, 'totalRooms', isPositive, 'Number of rooms must be positive')
  validator.validateField(user, 'cities', minLength.bind(null, 1), 'At least one city is required')
  validator.validateField(
    user,
    'averageDailyRate',
    isPositive,
    'Average daily rate must be positive'
  )
  SOCIAL_MEDIA_NAMES.forEach(socialMediaName =>
    validator.validateField(user, socialMediaName, isWebsiteUrl, `${socialMediaName} must be a URL`)
  )
  return validator.result()
}

export const validatePassword = password => {
  const validator = new Validator()
  validator.validateField({ password }, 'password', notEmpty, 'Password is required')
  validator.validateField(
    { password },
    'password',
    minLength.bind(null, 4),
    'Password must be at least 4 characters'
  )
  return validator.result()
}
