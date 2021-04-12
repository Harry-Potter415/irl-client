import { useFormState } from 'react-use-form-state'
import { validate } from 'shopjs/helpers'

// It keeps the form state and returns the validation errrors
const useForm = (initialState, validationRules) => {
  const [formState, { text, label, email, password }] = useFormState(initialState, {
    withIds: true,
  })

  const validation = validate(formState, validationRules)
  const isFieldValid = fieldName => formState.touched[fieldName] && !!validation.errors[fieldName]

  return [{ validation, isFieldValid, values: formState.values }, { text, label, email, password }]
}

export default useForm
