import { Validator } from './validator'
import { notEmpty } from './validate'

export const validateBankDetails = bankDetails => {
  const validator = new Validator()
  validator.validateField(bankDetails, 'accountHolderType', notEmpty, 'Account Type is required')
  validator.validateField(bankDetails, 'accountHolderName', notEmpty, 'Account Name is required')
  validator.validateField(bankDetails, 'accountNumber', notEmpty, 'Account Number is required')
  validator.validateField(bankDetails, 'routingNumber', notEmpty, 'Routing Number is required')
  return validator.result()
}
