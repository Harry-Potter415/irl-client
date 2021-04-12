import mem from 'mem'
import { buyClient } from 'shopjs/services/Shopify/clients'
import { buildSortObject, buildQueryObject } from 'shopjs/helpers'
import { normalize as normalizeProduct } from 'shopjs/helpers/products'
import { normalizeCollection } from 'shopjs/helpers/collection'

const client = buyClient

export const fetchShop = () => client.shop.fetchInfo()

export const fetchProduct = async handle =>
  normalizeProduct(await client.product.fetchByHandle(handle))

/** @see fetchProductsSearch()
 * productType defaults to "regular" (i.e. not-a-placement) to avoid rewriting the shop part
 * and make it aware of placements
 */
const fetchProducts = ({ query, pageSize = 30, productType = 'regular' }) => {
  let params = { first: pageSize }

  params = buildSortObject(params, query.sortOrder || 'popular')
  params = buildQueryObject(params, {
    ...(productType === 'all'
      ? {}
      : { [`${productType === 'regular' ? '-' : ''}product_type`]: 'Placement' }),
    ...query,
  })
  return client.product.fetchQuery(params)
}

/**
 * @param query Object that translates to a search (see docs)
 * @param pageSize
 * @param {"regular"|"all"|"placement"} productType Whether to fetch placements, not-placements or all.
 *   It can be overwritten by the search in the query
 * @returns {Promise<Array<*>>}
 * @see https://help.shopify.com/en/api/graphql-admin-api/reference/queryroot
 */
export const fetchProductsSearch = ({ query, pageSize = 30, productType = 'regular' }) =>
  fetchProducts({ query, pageSize, productType }).then(products =>
    Promise.all(products.map(normalizeProduct))
  )

export const fetchProductTypes = () => {
  const productsQuery = client.graphQLClient.query(root => {
    root.addConnection('productTypes', { args: { first: 100 } })
  })
  return client.graphQLClient.send(productsQuery)
}

export const fetchProductsByIds = ids =>
  client.product.fetchMultiple(ids).then(products => Promise.all(products.map(normalizeProduct)))

export const fetchCollectionByHandleNotCached = async handle =>
  await normalizeCollection(await client.collection.fetchByHandle(handle))

// cache collections for 10 minutes
export const fetchCollectionByHandle = mem(fetchCollectionByHandleNotCached, { maxAge: 600000 })

export const fetchCollections = async () => {
  const rawCollections = await client.collection.fetchAll()
  return Promise.all(rawCollections.map(normalizeCollection))
}

export const createCheckout = () => client.checkout.create()
export const fetchCheckoutById = checkoutId => client.checkout.fetch(checkoutId)
export const addLineItemsToCheckout = (checkoutId, lineItems) =>
  client.checkout.addLineItems(checkoutId, lineItems)
export const replaceLineItemsFromCheckout = (checkoutId, lineItems) =>
  client.checkout.replaceLineItems(checkoutId, lineItems)
export const updateLineItemsFromCheckout = (checkoutId, lineItems) =>
  client.checkout.updateLineItems(checkoutId, lineItems)
export const removeLineItemsFromCheckout = (checkoutId, lineItemIds) =>
  client.checkout.removeLineItems(checkoutId, lineItemIds)
export const addDiscountToCheckout = (checkoutId, discountCode = '') =>
  client.checkout.addDiscount(checkoutId, discountCode)
export const removeDiscountFromCheckout = async checkoutId =>
  client.checkout.removeDiscount(checkoutId)

export const fetchNextPage = page => client.fetchNextPage(page)
