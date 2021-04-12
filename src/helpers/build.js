import pluralize from 'pluralize'
import { selectList } from 'helpers/selectors'

export function buildList(state, resourceName, associations = []) {
  const pluralResourceName = pluralize(resourceName)
  const list = selectList(state, pluralResourceName)
  list[pluralResourceName] &&
    Object.keys(list[pluralResourceName]).forEach(key => {
      const resource = build(state, list[pluralResourceName][key].id, resourceName, associations)
      list[pluralResourceName][key] = resource
    })
  return list
}

export function build(state, id, resourceName, associations = [], from) {
  from = from || pluralize(resourceName)
  const object = state[from][id]
  if (!object) return
  const resource = Object.assign({}, object)
  let associationObject
  associations.forEach(association => {
    if (pluralize.isPlural(association)) {
      // iterate through the simple association objects on the resource
      resource[association] &&
        resource[association].forEach((associationItem, index) => {
          // get the loaded association object from the store
          associationObject = state[association] && state[association][associationItem.id]
          if (associationObject) {
            // replace the simple object with the loaded object
            resource[association][index] = { ...associationObject, loaded: true }
          }
        })
      // add association id on the resource for simplified use in handleChange
      resource[`${pluralize.singular(association)}Ids`] = resource[association].map(res => res.id)
    } else {
      // get the loaded association object from the store
      associationObject = state[pluralize(association)][resource[association].id]
      if (resource[association] && associationObject) {
        // replace the simple object with the loaded object
        resource[association] = { ...associationObject, loaded: true }
        // add association id on the resource for simplified use in handleChange
        resource[`${association}Id`] = resource[association].id
      }
    }
  })
  return resource
}
