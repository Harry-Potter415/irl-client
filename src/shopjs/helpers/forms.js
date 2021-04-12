import ValidaJs from 'valida-js'

export const validate = (formState, rules) => {
  const formValid = Object.keys(formState.values).every(
    key => typeof formState.validity[key] === 'undefined' || formState.validity[key]
  )

  // Normalize errors
  let errors = Object.keys(formState.errors).reduce((errors, key) => {
    if (formState.errors[key]) {
      if (!errors[key]) errors[key] = []

      errors[key] = [...errors[key], formState.errors[key]]
    }

    return errors
  }, {})

  // If there are no additional validation rules,
  // return the current validation result
  if (!rules) return { valid: formValid, errors }

  const rulesObj = rules.reduce(
    (res, rule) => ({ ...res, [`${rule.stateMap}_${rule.type}`]: rule }),
    {}
  )

  // Extend the validation adding ValidaJs
  const validationRules = ValidaJs.rulesCreator(ValidaJs.validators, rules)
  const validation = ValidaJs.validate(validationRules, formState.values)

  // Concat the validation errors
  errors = Object.keys(validation.errors).reduce((errors, key) => {
    if (validation.errors[key]) {
      if (!errors[key]) errors[key] = []

      const validationErrors = validation.errors[key].map(error => {
        const rule = rulesObj[`${key}_${error}`]

        return rule.error || error
      })

      // Append the ValidaJs validation errors
      // to the existing array with errors
      errors[key] = [...errors[key], ...validationErrors]
    }

    return errors
  }, errors)

  return {
    valid: formValid && validation.valid,
    errors,
  }
}
