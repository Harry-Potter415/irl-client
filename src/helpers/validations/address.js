import { Validator } from './validator'
import { notEmpty } from './validate'

export const validateAddress = address => {
  const validator = new Validator()
  validator.validateField(address, 'address1', notEmpty, 'Address 1 is required')
  validator.validateField(address, 'city', notEmpty, 'City is required')
  validator.validateField(address, 'state', notEmpty, 'State is required')
  validator.validateField(address, 'country', notEmpty, 'Country is required')
  validator.validateField(address, 'zipcode', notEmpty, 'Zipcode is required')
  return validator.result()
}
