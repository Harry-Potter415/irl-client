import Api from 'api'
import normalize from 'jsonapi-normalizer'
import { get } from 'lodash'
import debounce from 'debounce-async'
import { titleizeUnderscore } from 'helpers/utils'
import { fetchProduct, fetchProductsSearch } from 'shopjs/services/Shopify/buy'

// load options from json api format
function loadOptions(inputValue, callback, url, entity, mapResourceToOptions) {
  Api.get(`${url}?search=${inputValue}`)
    .then(res => {
      const resources = normalize(res.data).entities[entity]
      const options = resources && Object.values(resources).map(mapResourceToOptions)
      return callback(options)
    })
    .catch(err => {
      console.error(err)
    })
}

// load options from array
function loadOptionsFromList(inputValue, callback, url, mapResourceToOptions) {
  Api.get(`${url}?search=${inputValue}`)
    .then(res => {
      const options = res.data.map(mapResourceToOptions)
      return callback(options)
    })
    .catch(err => {
      console.error(err)
    })
}

export function loadAdminUserOptions(inputValue, callback) {
  const url = '/api/v1/admin/users'
  const entity = 'user'
  const mapResourceToOptions = user => {
    return { value: user.id, label: user.email }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadAdminUserCompanyOptions(inputValue, callback) {
  const url = '/api/v1/admin/users'
  const entity = 'user'
  const mapResourceToOptions = user => {
    return { value: user.id, label: user.company }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadUserCampaignUserOptions(inputValue, callback) {
  const url = '/api/v1/app/users/me/hosts'
  const entity = 'user'
  const mapResourceToOptions = user => {
    return { value: user.id, label: user.name }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadAdminAddressOptions(inputValue, callback) {
  const url = '/api/v1/admin/addresses'
  const entity = 'address'
  loadOptions(inputValue, callback, url, entity, buildAdminAddressOption)
}

export function loadAdminProductOptions(inputValue, callback) {
  const url = '/api/v1/admin/products'
  const entity = 'product'
  const mapResourceToOptions = product => {
    return { value: product.id, label: product.title }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadMyProductsOptions(inputValue, callback) {
  const url = '/api/v1/app/products/my_products'
  const entity = 'product'
  const mapResourceToOptions = product => {
    return { value: product.id, label: product.title }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadAdminCampaignOptions(inputValue, callback) {
  const url = '/api/v1/admin/campaigns'
  const entity = 'campaign'
  const mapResourceToOptions = campaign => {
    return { value: campaign.id, label: campaign.title }
  }
  loadOptions(inputValue, callback, url, entity, mapResourceToOptions)
}

export function loadPropertyTypeOptions(inputValue, callback) {
  const url = '/api/v1/public/property_types' // TODO: constant - avoid unnecessary requests
  const mapResourceToOptions = type => {
    return { value: type.key, label: type.name }
  }
  loadOptionsFromList(inputValue, callback, url, mapResourceToOptions)
}

// use a simple caching, save trees and api requests - cities are not gonna change during a visit
let cachedCityOptions = null
export async function loadCityOptions(inputValue) {
  if (!cachedCityOptions) {
    const res = await Api.get('/api/v1/public/cities')
    if (!res.data && res.data.length) {
      console.error('No cities retrieved')
      return [] // but don't break the select
    }
    cachedCityOptions = res.data.map(buildOptionFromString)
  }
  const lowerCaseInput = inputValue.toLowerCase() // speed up matching
  return cachedCityOptions.filter(option => option.label.toLowerCase().includes(lowerCaseInput))
}

export function buildProductOption(product) {
  return product && { value: product.id, label: product.title }
}

export function buildProductsOption(products) {
  return products && products.map(product => buildProductOption(product))
}

export function buildUserOption(user) {
  return user && { value: user.id, label: user.email }
}

export function buildUserCompanyOption(user) {
  return user && { value: user.id, label: user.company }
}

export function buildUserTypeOption(userType, types = {}) {
  return userType && { value: userType, label: types[userType] }
}

export function buildPropertyTypeOption(type) {
  if (type) {
    // TODO: use property types list from the API
    // convert underscore to spaces and titleize
    const label = titleizeUnderscore(type)
    return { value: type, label }
  }
  return null
}

export function buildCityOption(city) {
  return city && { value: city, label: city }
}

// TODO: gradually replace the duplication in `buildFooOption` functions with this fn
export function buildOptionFromString(aString) {
  return aString && { value: aString, label: aString }
}

export function buildAdminAddressOption(address) {
  return address && { value: address.id, label: address.fullAddress }
}

export function buildOptions(list) {
  return (
    list &&
    list.map(item => {
      return { value: item, label: item }
    })
  )
}

/*
 * Shopify entities
 */
const debouncedLoadShopifyProduct = debounce(fetchProduct, 300)
const debouncedFetchShopifyProductSearch = debounce(fetchProductsSearch, 300)

// Variants
export const buildShopifyVariantOption = (variant = {}) => ({
  value: variant.id,
  label: variant.title,
})

export const loadShopifyVariantOption = (productHandle, useDebounce = true) => async () => {
  if (!productHandle) return
  const fetcher = useDebounce ? debouncedLoadShopifyProduct : fetchProduct
  try {
    const product = await fetcher(productHandle)
    return get(product, 'variants', []).map(buildShopifyVariantOption)
  } catch (error) {
    console.error('Error fetching product variant', error)
  }
}

export const buildShopifyHandleOption = handle => ({ value: handle, label: handle })

export const loadSearchPlacementsHandlesOption = (useDebounce = true) => async input => {
  // NB: empty input fetches all placements
  const fetcher = useDebounce ? debouncedFetchShopifyProductSearch : fetchProductsSearch
  try {
    // can't query by handle, but can do by title
    // @see https://help.shopify.com/en/api/graphql-admin-api/reference/queryroot
    const products = await fetcher({ query: { title: input }, productType: 'placement' })
    return products.map(product => buildShopifyHandleOption(product.handle))
  } catch (error) {
    console.error('Error fetching product handles', error)
  }
}

export const loadSearchShopHandlesOption = (useDebounce = true) => async input => {
  // NB: empty input fetches all placements
  const fetcher = useDebounce ? debouncedFetchShopifyProductSearch : fetchProductsSearch
  try {
    // can't query by handle, but can do by title
    // @see https://help.shopify.com/en/api/graphql-admin-api/reference/queryroot
    const products = await fetcher({ query: { title: input } })
    return products.map(product => buildShopifyHandleOption(product.handle))
  } catch (error) {
    console.error('Error fetching product handles', error)
  }
}

export const loadSearchProductsOption = (useDebounce = true) => async input => {
  // NB: empty input fetches all placements
  const fetcher = useDebounce ? debouncedFetchShopifyProductSearch : fetchProductsSearch
  try {
    const products = await fetcher({ query: { title: input } })
    return products.map(product => buildShopifyTitleOption(product))
  } catch (error) {
    console.error('Error fetching products', error)
  }
}

export const buildShopifyTitleOption = ({ title, id }) => ({ value: id, label: title })
