import Client from 'shopify-buy/index.unoptimized.umd'
import { GraphQLClient } from 'graphql-request'
import config from 'shopjs/config'

const { domain, accessToken } = config.services.buyJsClient
const { url, headers } = config.services.storefrontRaw

export const buyClient = Client.buildClient({
  domain,
  storefrontAccessToken: accessToken,
})

export const storefrontClient = new GraphQLClient(url, { headers })
