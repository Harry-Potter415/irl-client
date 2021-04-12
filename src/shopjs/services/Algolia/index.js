import algoliasearch from 'algoliasearch/lite'
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID
const ALGOLIA_SEARCH_API_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY
const ALGOLIA_SHOPIFY_PRODUCTS_INDEX = process.env.REACT_APP_ALGOLIA_SHOPIFY_PRODUCTS_INDEX
const ALGOLIA_SHOPIFY_COLLECTIONS_INDEX = process.env.REACT_APP_ALGOLIA_SHOPIFY_COLLECTIONS_INDEX

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY)
export const algolia = client.initIndex(ALGOLIA_SHOPIFY_PRODUCTS_INDEX)
export const productsIndex = client.initIndex(ALGOLIA_SHOPIFY_PRODUCTS_INDEX)
export const collectionsIndex = client.initIndex(ALGOLIA_SHOPIFY_COLLECTIONS_INDEX)
