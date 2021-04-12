import { Validator } from './validator'
import { notEmpty, isPositive } from './validate'

export const validateWholesaleAndRetailProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'title', notEmpty, 'Title is required')
  validator.validateField(product, 'description', notEmpty, 'Description is required')
  validator.validateField(product, 'userId', notEmpty, 'User is required')
  validator.validateField(product, 'pricePerUnit', notEmpty, 'Unit Price is required')
  validator.validateField(product, 'retailPrice', notEmpty, 'Retail Price is required')
  validator.validateField(product, 'minimumOrder', notEmpty, 'Minimum Order is required')
  validator.validateField(product, 'quantity', notEmpty, 'Quantity is required')
  validator.validateField(product, 'unitsPerCarton', notEmpty, 'Units per Case is required')
  validator.validateField(product, 'images', notEmpty, 'At least one image is required')
  if (product.multipleVariants) {
    validator.validateField(product, 'option', notEmpty, 'Option is required')
    validator.validateField(product, 'variantTitle1', notEmpty, 'Variant Title is required')
    ;[...Array(product.numberOfVariants).keys()].forEach(variantNumber => {
      variantNumber += 2
      validator.validateField(
        product,
        `variantTitle${variantNumber}`,
        notEmpty,
        'Variant Title is required'
      )
      validator.validateField(
        product,
        `pricePerUnit${variantNumber}`,
        notEmpty,
        'Unit Price is required'
      )
      validator.validateField(
        product,
        `retailPrice${variantNumber}`,
        notEmpty,
        'Retail Price is required'
      )
      validator.validateField(product, `quantity${variantNumber}`, notEmpty, 'Quantity is required')
      validator.validateField(
        product,
        `unitsPerCarton${variantNumber}`,
        notEmpty,
        'Units per Case is required'
      )
    })
  }
  return validator.result()
}

export const validateAdminRetailProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'wholesaleId', notEmpty, 'Product Handle is required')
  return validator.result()
}

export const validateAdminProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'title', notEmpty, 'Title is required')
  validator.validateField(product, 'description', notEmpty, 'Description is required')
  validator.validateField(product, 'url', notEmpty, 'Url is required')
  validator.validateField(product, 'userId', notEmpty, 'User is required')
  return validator.result()
}

export const validateAdminShopProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'title', notEmpty, 'Title is required')
  validator.validateField(product, 'description', notEmpty, 'Description is required')
  validator.validateField(product, 'userId', notEmpty, 'User is required')
  validator.validateField(product, 'productType', notEmpty, 'Product Type is required')
  validator.validateField(product, 'pricePerUnit', notEmpty, 'Price per Unit is required')
  validator.validateField(product, 'pricePerUnit', isPositive, 'Price per Unit must be positive')
  validator.validateField(product, 'retailPrice', notEmpty, 'Retail Price is required')
  validator.validateField(product, 'retailPrice', isPositive, 'Retail Price must be positive')
  return validator.result()
}

export const validateAdminShopPlacementProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'title', notEmpty, 'Titles is required')
  validator.validateField(product, 'description', notEmpty, 'Description is required')
  validator.validateField(product, 'userId', notEmpty, 'User is required')
  validator.validateField(product, 'minimumOrder', notEmpty, 'Minimum Order is required')
  validator.validateField(product, 'minimumOrder', isPositive, 'Minimum Order must be positive')
  return validator.result()
}

export const validateProduct = product => {
  const validator = new Validator()
  validator.validateField(product, 'title', notEmpty, 'Title is required')
  validator.validateField(product, 'description', notEmpty, 'Description is required')
  validator.validateField(product, 'url', notEmpty, 'Url is required')
  return validator.result()
}
