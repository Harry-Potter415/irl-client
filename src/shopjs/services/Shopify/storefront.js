import { storefrontClient } from 'shopjs/services/Shopify/clients'
import { get } from 'lodash'

const client = storefrontClient

export const rawGqlQuery = async (gql, variables, res, err) => {
  try {
    await client.request(gql, variables)
  } catch (e) {
    console.log(e)
  }
}

// Signout the customer
export const signoutUser = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerAccessTokenDelete,
    variables,
    'customerAccessTokenDelete',
    'customerAccessTokenDelete.userErrors'
  )
}

// Signup an customer
export const signupUser = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerCreate,
    variables,
    'customerCreate',
    'customerCreate.userError'
  )
}

// Login an customer
export const loginUser = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerAccessTokenCreate,
    variables,
    'customerAccessTokenCreate',
    'customerAccessTokenCreate.customerUserErrors'
  )
}

// Renew the customer's access token after it expires
export const renewCustomerAccessToken = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerAccessTokenRenew,
    variables,
    'customerAccessTokenRenew',
    'customerAccessTokenRenew.customerUserErrors'
  )
}

// Get the past orders for an customer
export const getPastOrders = async (variables = {}) => {
  return rawGqlQuery(rawQueries.queries.customerPastOrders, variables, 'customer.orders')
}

// Get the past order for an customer
export const getPastOrder = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.queries.customerPastOrder,
    variables,
    response => get(response, 'customer.orders.edges', [])[0]
  )
}

// Get the account for an customer
export const getCustomerData = async (variables = {}) => {
  return rawGqlQuery(rawQueries.queries.getCustomerData, variables, 'customer')
}

// Update the customer's default address
export const customerAddressUpdate = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerAddressUpdate,
    variables,
    'customerAddressUpdate.customerAddress',
    'customerAddressUpdate.customerUserErrors'
  )
}

// Update the customer's account information address
export const customerUpdate = async (variables = {}) => {
  return rawGqlQuery(
    rawQueries.mutations.customerUpdate,
    variables,
    'customerUpdate.customerAccessToken',
    'customerUpdate.customerUserErrors'
  )
}

// get orders by id
export const getShopifyOrders = async (variables = {}) => {
  return client.request(rawQueries.queries.getOrders, variables)
}

// get orders by id
export const getShopifyOrder = async (variables = {}) => {
  return client.request(rawQueries.queries.getOrder, variables)
}

const checkoutFragment = `
  fragment VariantFragment on ProductVariant {
    id
    title
    priceV2 {
      amount
      currencyCode
    }
    sku
    image {
      originalSrc
      altText
    }
    selectedOptions {
      name
      value
    }
  }
  fragment VariantWithProductFragment on ProductVariant {
    ...VariantFragment
    product {
      id
      handle
      productType
    }
  }
  fragment OrderFragment on Order {
    id
    orderNumber
    processedAt
    statusUrl
    email
    phone
    shippingAddress {
      name
      formatted
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
  }
  fragment CheckoutFragment on Checkout {
    id
    order {
      ...OrderFragment
    }
    lineItems(first: 100) {
      edges {
        cursor
        node {
          id
          title
          quantity
          variant {
            ...VariantWithProductFragment
          }
        }
      }
    }
  }
`

const rawQueries = {
  queries: {
    getOrders: `
      ${checkoutFragment}

      query($ids: [ID!]!) {
      	nodes(ids: $ids) {
      		__typename
      		...CheckoutFragment
      	}
      }
    `,
    getOrder: `
      ${checkoutFragment}

      query($id: ID!) {
        node(id: $id) {
          __typename
          ...CheckoutFragment
        }
      }
    `,
    getCustomerData: `
    query GetCustomerData($customerAccessToken: String!){
       customer(customerAccessToken: $customerAccessToken) {
          id
          createdAt
          displayName
          firstName
          lastName
          email
          phone
          defaultAddress{
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
       }
   }
   `,
    customerPastOrders: `
   query GetCustomerPastOrders($customerAccessToken: String!, $cursor: String){
      customer(customerAccessToken:$customerAccessToken) {
        orders(first:30, after: $cursor){
           edges{
             cursor
             node{
              id
              name
              statusUrl
              subtotalPrice
              orderNumber
              processedAt
              currencyCode
              totalTax
              totalPrice
              totalRefunded
              totalShippingPrice
            }
           }
            pageInfo{
              hasPreviousPage
              hasNextPage
            }
         }
     }
  }
  `,
    customerPastOrder: `
    query GetCustomerPastOrders($customerAccessToken: String!, $query: String!){
      customer(customerAccessToken:$customerAccessToken) {
        orders(first:1, query:$query){
           edges{
             node{
              id
              name
              statusUrl
              subtotalPrice
              orderNumber
              processedAt
              currencyCode
              totalTax
              totalPrice
              totalRefunded
              totalShippingPrice
              lineItems(first:250){
                edges{
                  node{
                    title
                    quantity
                    variant{
                      price
                      image{
                        src
                      }
                      selectedOptions{
                        name
                        value
                      }
                      product{
                        handle
                      }
                    }
                  }
                }
              }
            }
           }
         }
     }
  }
  `,
  },
  mutations: {
    customerAccessTokenCreate: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }

        customerUserErrors {
          code
          field
          message
        }
      }
    }`,
    customerAccessTokenRenew: `mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }`,
    customerAccessTokenDelete: `mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }`,
    customerCreate: `mutation customerCreate($input: CustomerCreateInput!){
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        userErrors {
          field
          message
        }
      }
    }`,
    customerUpdate: `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }`,
    customerAddressUpdate: `mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }`,
  },
}
