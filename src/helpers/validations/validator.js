export class Validator {
  constructor() {
    this.isValid = true
    this.errors = {}
  }

  validateField(obj, field, func, errorMessage) {
    if (!func(obj[field])) {
      this.isValid = false
      if (!this.errors[field]) {
        this.errors[field] = errorMessage
      }
    }
  }

  result() {
    return {
      isValid: this.isValid,
      errors: this.errors,
    }
  }
}
