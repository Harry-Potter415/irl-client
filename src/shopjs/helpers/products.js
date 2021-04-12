import { get, isEqual, pick } from 'lodash'
import { getBrandName } from 'api/brands'

export const getVendor = async product =>
  isNaN(parseFloat(product.vendor)) ? product.vendor : await getBrandName(product.vendor)

export const normalize = async product =>
  product && {
    ...pick(product, [
      'id',
      'title',
      'handle',
      'onlineStoreUrl',
      'vendor',
      'description',
      'descriptionHtml',
      'productType',
      'updatedAt',
      'publishedAt',
      'hasNextPage',
      'hasPrevPage',
      'nextPageQueryAndPath',
    ]),
    variants: product.variants && product.variants.map(v => normalizeVariant(v)),
    options: product.options && product.options.map(o => normalizeAvailableOptions(o)),
    images: product.images && product.images.map(i => i.src),
    // if the vendor is text, display it; if it's number, show the brand with that id
    vendor: await getVendor(product),
  }

export const normalizeVariant = variant =>
  variant && {
    ...pick(variant, ['id', 'sku', 'price', 'compareAtPrice', 'available', 'title', 'weight']),
    selectedOptions: normalizeOptions(variant.selectedOptions),
    imageUrl: getImage(variant),
  }

export const normalizeAvailableOptions = option => {
  let { name } = option
  let values = option.values.map(v => v.value)
  let _option = {
    name,
    values,
    isColor: isColorOption(option),
    isSize: isSizeOption(option),
  }
  return _option
}

export const normalizeOptions = options => {
  let option = {}
  options.forEach(opt => {
    option[opt.name] = opt.value
  })
  return option
}

export const selectVariantByOptions = (product, options) => {
  let selectedVariant
  product.variants.forEach(variant => {
    if (isEqual(variant.selectedOptions, options)) {
      selectedVariant = variant
    }
  })
  return selectedVariant
}

export const isColorOption = option => option.name === 'Color'

export const isSizeOption = option => option.name === 'Size'

export const getByIndex = (coll, i) => get(coll, i)

export const getImage = variant => get(variant, 'image.src')

export const getColorOptionProp = (options, prop) =>
  get(options, null, null, options => (options.find(isColorOption) || {})[prop])

export const getSizeOptionProp = (options, prop) =>
  get(options, null, null, options => (options.find(isSizeOption) || {})[prop])

export const getColor = variant =>
  get(variant, null, null, variant => getColorOptionProp(variant.selectedOptions, 'value'))

export const getSize = variant =>
  get(variant, null, null, variant => getSizeOptionProp(variant.selectedOptions, 'value'))

export const getVariantByOptionName = (name, variant, options) => {
  if (!variant.selectedOptions) return false

  return variant.selectedOptions.some(so => {
    return so.name === name && so.value === options[name]
  })
}

export const cleanHandle = text => text.replace(/[0-9]/g, '').replace(/-/g, ' ')

export const getLinks = products =>
  products.map(({ id, images, handle }) => ({ id, src: get(images[0], 'src'), handle }))
