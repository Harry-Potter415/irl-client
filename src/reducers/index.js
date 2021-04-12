import { combineReducers } from 'redux'
import alerts from './alerts'
import auth from './auth'
import loaders from './loaders'
import adminCampaigns from './admin/campaigns'
import adminProducts from './admin/products'
import adminAddresses from './admin/addresses'
import adminUsers from './admin/users'
import adminUserCampaigns from './admin/userCampaigns'
import adminReviews from './admin/reviews'
import adminMessages from './admin/messages'
import products from './products'
import campaigns from './campaigns'
import addresses from './addresses'
import uploader from './uploader'
import layout from './layout'
import publicReviews from './public/reviews'
import orders from './orders'
import hosts from './hosts'
import userCampaigns from './userCampaigns'
import reviews from './reviews'
import stripeAccountLinks from './stripe/accountLinks'
import stripeAccounts from './stripe/accounts'

const rootReducer = combineReducers({
  alerts,
  auth,
  loaders,
  adminCampaigns,
  adminProducts,
  adminAddresses,
  adminUsers,
  adminUserCampaigns,
  adminReviews,
  adminMessages,
  products,
  campaigns,
  addresses,
  uploader,
  layout,
  publicReviews,
  orders,
  hosts,
  userCampaigns,
  reviews,
  stripeAccountLinks,
  stripeAccounts,
})

export default rootReducer
