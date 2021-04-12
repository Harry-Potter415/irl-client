import { Validator } from './validator'
import { notEmpty } from './validate'

const STEP_VALIDATIONS = {
  0: campaign => {
    const validator = new Validator()
    validator.validateField(campaign, 'title', notEmpty, 'Title is required')
    validator.validateField(campaign, 'productIds', notEmpty, 'Products is required')
    validator.validateField(campaign, 'description', notEmpty, 'Description is required')
    validator.validateField(campaign, 'promoCode', notEmpty, 'Promo Code is required')
    validator.validateField(campaign, 'quantity', notEmpty, 'Quantity is required')
    validator.validateField(campaign, 'startDate', notEmpty, 'Start Date is required')
    return validator.result()
  },
  1: campaign => {
    const validator = new Validator()
    validator.validateField(campaign, 'cities', notEmpty, 'At least one city is required')
    return validator.result()
  },
  2: () => {
    const validator = new Validator()
    return validator.result()
  },
}

export const validateCampaign = campaign => {
  const validator = new Validator()
  validator.validateField(campaign, 'title', notEmpty, 'Title is required')
  validator.validateField(campaign, 'productIds', notEmpty, 'Products is required')
  validator.validateField(campaign, 'description', notEmpty, 'Description is required')
  validator.validateField(campaign, 'promoCode', notEmpty, 'Promo Code is required')
  validator.validateField(campaign, 'quantity', notEmpty, 'Quantity is required')
  validator.validateField(campaign, 'startDate', notEmpty, 'Start Date is required')
  validator.validateField(campaign, 'cities', notEmpty, 'At least one city is required')
  return validator.result()
}

export const validateCampaignStep = (step, campaign) => {
  return STEP_VALIDATIONS[step](campaign)
}

export const validateAdminCampaign = campaign => {
  const validator = new Validator()
  validator.validateField(campaign, 'title', notEmpty, 'Title is required')
  validator.validateField(campaign, 'userId', notEmpty, 'User is required')
  validator.validateField(campaign, 'productIds', notEmpty, 'Products is required')
  validator.validateField(campaign, 'promoCode', notEmpty, 'Promo Code is required')
  validator.validateField(campaign, 'quantity', notEmpty, 'Quantity is required')
  validator.validateField(campaign, 'startDate', notEmpty, 'Start Date is required')
  validator.validateField(campaign, 'endDate', notEmpty, 'End Date is required')
  validator.validateField(campaign, 'cities', notEmpty, 'At least one city is required')
  return validator.result()
}
