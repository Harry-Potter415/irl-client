import pluralize from 'pluralize'
import { kebabCase, get } from 'lodash'
import { showAlertSuccess } from 'actions/alerts'

// options: reactSelect - boolean
//          datePickerSelect - boolean
//          field - string - field name (used for handleReactSelectChange)
export function handleChange(resourceName, e, options = {}) {
  let value
  let name
  if (options.reactSelect && !options.isMulti) {
    // Note e will be undefined when react-select fields are "cleared"
    value = e && e.value
    name = options.field
  } else if (options.reactSelect && options.isMulti) {
    value = e.map(option => option.value)
    name = options.field
  } else if (options.datePickerSelect) {
    value = e
    name = options.field
  } else if (options.imageUploader) {
    value = e
    name = options.field
  } else if (options.customField) {
    value = e
    name = options.field
  } else {
    const { target } = e
    value = target.type === 'checkbox' ? target.checked : target.value
    name = e.target.name
  }
  const resource = this.state[resourceName]
  resource[name] = value
  const newState = {}
  newState[resourceName] = resource
  this.setState({
    ...newState,
    errors: {
      ...this.state.errors,
      [name]: null,
    },
  })
  return {
    fieldName: name,
    fieldValue: value,
  }
}

export function isLoaded(resource, associations) {
  if (resource && associations) {
    const hasUnloadedAssociation = associations.find(association => {
      let loaded
      if (pluralize.isPlural(association)) {
        if (resource && resource[association] && resource[association][0]) {
          loaded = resource[association][0].loaded
        } else {
          // return true if the resource doesn't have this association
          // required for optional fields
          loaded = true
        }
      } else {
        if (resource && resource[association] && resource[association]) {
          loaded = resource[association].loaded
        } else {
          loaded = true
        }
      }
      return !loaded
    })
    return !hasUnloadedAssociation
  }
  return Boolean(resource)
}

function afterSaveRedirect(res, resourceName, urlPrefix, history) {
  let url = `/${kebabCase(pluralize(resourceName))}/${res.data.data.id}`
  if (urlPrefix) url = `${urlPrefix}${url}`
  history.push(url)
}

export async function saveResource({
  resourceName,
  validateFunction,
  action,
  urlPrefix,
  history,
  message,
  callback,
}) {
  try {
    const resource = this.state[resourceName]
    const validate = validateFunction(resource)
    if (validate.isValid) {
      const res = await action(resource)
      if (callback) {
        const data = get(res, 'data.data', {})
        callback(data)
      } else {
        afterSaveRedirect(res, resourceName, urlPrefix, history)
      }
      showAlertSuccess(message)
    } else {
      this.setState({ errors: validate.errors })
    }
  } catch (e) {}
}
