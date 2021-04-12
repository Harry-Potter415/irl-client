import { Validator } from './validator'
import { isEmail, notEmpty } from './validate'

export const validateReview = review => {
  const validator = new Validator()
  validator.validateField(review, 'rating', notEmpty, 'Rating is required')
  validator.validateField(review, 'comment', notEmpty, 'Comment is required')
  return validator.result()
}

export const validateReviewer = reviewer => {
  const validator = new Validator()
  validator.validateField(reviewer, 'email', isEmail, 'Invalid email')
  return validator.result()
}
