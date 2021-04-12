import React, { Component, lazy } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { USER_TYPES } from 'lib/constants'
import { resetLayout } from 'actions/layout'
import withAnalytics from 'hocs/withAnalytics'
import withChat from 'hocs/withChat'

import AdminRoute from 'components/routes/AdminRoute'
import PrivateRoute from 'components/routes/PrivateRoute'
import PublicRoute from 'components/routes/PublicRoute'
import IndexRouteRedirect from 'components/routes/IndexRouteRedirect'
import Login from 'containers/auth/Login'
import Signup from 'containers/auth/Signup'
import NotFound from 'components/routes/NotFound'
import ForgotPassword from 'containers/auth/ForgotPassword'
import ResetPassword from 'containers/auth/ResetPassword'
import UserEdit from 'containers/users/UserEdit'
import UserEditBilling from 'containers/users/UserEditBilling'

import Products from 'containers/products/Products'
import ViewProduct from 'containers/products/ViewProduct'
import CreateProduct from 'containers/products/CreateProduct'
import UpdateProduct from 'containers/products/UpdateProduct'
import CreateRetailProduct from 'containers/products/CreateRetailProduct'

import MyCampaigns from 'containers/campaigns/MyCampaigns'
import Campaign from 'containers/campaigns/Campaign'
import CreateCampaign from 'containers/campaigns/CreateCampaign'
import UpdateCampaign from 'containers/campaigns/UpdateCampaign'
import UploadCampaignImages from 'containers/campaigns/UploadCampaignImages'

import Orders from 'containers/orders/Orders'
import Order from 'containers/orders/Order'

import MyAddresses from 'containers/addresses/MyAddresses'
import CreateAddress from 'containers/addresses/CreateAddress'
import UpdateAddress from 'containers/addresses/UpdateAddress'

import AdminCampaigns from 'containers/admin/campaigns/AdminCampaigns'
import AdminViewCampaign from 'containers/admin/campaigns/AdminViewCampaign'
import AdminUpdateCampaign from 'containers/admin/campaigns/AdminUpdateCampaign'
import AdminCreateCampaign from 'containers/admin/campaigns/AdminCreateCampaign'
import ApproveCampaignImages from 'containers/admin/campaigns/ApproveCampaignImages'
import UserCampaigns from 'containers/admin/campaigns/UserCampaigns'

import AdminReviews from 'containers/admin/reviews/AdminReviews'
import AdminCampaignReviews from 'containers/admin/reviews/AdminCampaignReviews'
import AdminProductReviews from 'containers/admin/reviews/AdminProductReviews'
import AdminViewReview from 'containers/admin/reviews/AdminViewReview'
import ApproveReviewImages from 'containers/admin/reviews/ApproveReviewImages'
import ReviewsAll from 'components/dashboard/ReviewsAll'

import AdminProducts from 'containers/admin/products/AdminProducts'
import AdminViewProduct from 'containers/admin/products/AdminViewProduct'
import AdminUpdateProduct from 'containers/admin/products/AdminUpdateProduct'

import AdminMessages from 'containers/admin/textMessages/AdminMessages'

import AdminAddresses from 'containers/admin/addresses/AdminAddresses'
import AdminUpdateAddress from 'containers/admin/addresses/AdminUpdateAddress'
import AdminCreateAddress from 'containers/admin/addresses/AdminCreateAddress'

import AdminUsers from 'containers/admin/users/AdminUsers'
import AdminUpdateUser from 'containers/admin/users/AdminUpdateUser'

import AdminUserCampaigns from 'containers/admin/userCampaigns/AdminUserCampaigns'
import AdminUserCampaign from 'containers/admin/userCampaigns/AdminUserCampaign'

import BrandDashboard from 'containers/dashboard/BrandIndex'

import PublicReviews from 'containers/public/PublicReviews'

const ShopHome = lazy(() => import('shopjs/containers/Home'))
const Search = lazy(() => import('shopjs/components/Search/SearchList'))
const ProductShow = lazy(() => import('shopjs/components/Products/ProductShow'))
const VendorList = lazy(() => import('shopjs/components/Vendor/VendorList'))
const CollectionList = lazy(() => import('shopjs/components/Collections/CollectionList'))
const CartList = lazy(() => import('shopjs/components/Cart/CartList'))

class Routes extends Component {
  render() {
    this.props.analytics.trackPageView()

    this.props.resetLayout()
    return (
      <Switch>
        <IndexRouteRedirect exact path="/" publicTo="/login" />
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/signup" component={Signup} exact />
        <PublicRoute path="/forgotPassword" component={ForgotPassword} exact />
        <PublicRoute path="/users/password/edit" component={ResetPassword} exact />
        <PrivateRoute path="/user/edit" component={UserEdit} exact />
        <PrivateRoute path="/user/edit/billing" component={UserEditBilling} exact />

        <PublicRoute path="/reviews/:userId" component={PublicReviews} allowAuthenticated exact />

        <PrivateRoute path="/placements" component={MyCampaigns} exact />
        <PrivateRoute
          userType={USER_TYPES.brand}
          path="/placements/new"
          component={CreateCampaign}
          exact
        />
        <PrivateRoute path="/placements/:id" component={Campaign} exact />
        <PrivateRoute
          userType={USER_TYPES.brand}
          path="/placements/:id/edit"
          component={UpdateCampaign}
          exact
        />
        <PrivateRoute
          userType={USER_TYPES.host}
          path="/placements/:id/images"
          component={UploadCampaignImages}
          exact
        />

        <PrivateRoute userType={USER_TYPES.host} path="/orders" component={Orders} exact />
        <PrivateRoute userType={USER_TYPES.host} path="/orders/:id" component={Order} exact />

        <PrivateRoute path="/products" component={Products} exact />
        <PrivateRoute
          userType={USER_TYPES.brand}
          path="/products/new"
          component={CreateProduct}
          exact
        />
        <PrivateRoute path="/products/:id" component={ViewProduct} exact />
        <PrivateRoute
          userType={USER_TYPES.brand}
          path="/products/:id/edit"
          component={UpdateProduct}
          exact
        />

        <PrivateRoute userType={USER_TYPES.host} path="/addresses" component={MyAddresses} exact />
        <PrivateRoute
          userType={USER_TYPES.host}
          path="/addresses/new"
          component={CreateAddress}
          exact
        />
        <PrivateRoute
          userType={USER_TYPES.host}
          path="/addresses/:id/edit"
          component={UpdateAddress}
          exact
        />

        <PublicRoute exact path="/shop" component={ShopHome} allowAuthenticated={true} />
        <PublicRoute exact path="/shop/search" component={Search} allowAuthenticated={true} />
        <PublicRoute
          exact
          path="/shop/products/:productHandle"
          component={ProductShow}
          allowAuthenticated={true}
        />
        <PublicRoute
          exact
          path="/shop/brands/:brand"
          component={VendorList}
          allowAuthenticated={true}
        />
        <PublicRoute
          exact
          path="/shop/collections/:collectionHandle"
          component={CollectionList}
          allowAuthenticated={true}
        />
        <PublicRoute
          exact
          path="/shop/collections/:collectionHandle/products/:productHandle"
          component={ProductShow}
          allowAuthenticated={true}
        />
        <PrivateRoute userType={USER_TYPES.host} exact path="/shop/cart" component={CartList} />
        <PrivateRoute
          userType={USER_TYPES.brand}
          exact
          path="/dashboard"
          component={BrandDashboard}
        />
        <PrivateRoute
          userType={USER_TYPES.brand}
          exact
          path="/dashboard/reviews"
          component={ReviewsAll}
        />

        <AdminRoute path="/admin/placements" component={AdminCampaigns} exact />
        <AdminRoute path="/admin/placements/new" component={AdminCreateCampaign} exact />
        <AdminRoute path="/admin/placements/:id" component={AdminViewCampaign} exact />
        <AdminRoute path="/admin/placements/:id/edit" component={AdminUpdateCampaign} exact />
        <AdminRoute
          path="/admin/placements/:id/approve-images"
          component={ApproveCampaignImages}
          exact
        />
        <AdminRoute path="/admin/placements/:id/hosts" component={UserCampaigns} exact />

        <AdminRoute path="/admin/reviews" component={AdminReviews} exact />
        <AdminRoute
          path="/admin/reviews/:id/approve-images"
          component={ApproveReviewImages}
          exact
        />
        <AdminRoute
          path="/admin/placements/:campaignId/reviews"
          component={AdminCampaignReviews}
          exact
        />
        <AdminRoute
          path="/admin/products/:productId/reviews"
          component={AdminProductReviews}
          exact
        />
        <AdminRoute path="/admin/reviews/:id" component={AdminViewReview} exact />

        <AdminRoute path="/admin/text_messages" component={AdminMessages} exact />

        <AdminRoute path="/admin/products" component={AdminProducts} exact />
        <AdminRoute path="/admin/products/new" component={CreateProduct} exact />
        <AdminRoute path="/admin/retail_products/new" component={CreateRetailProduct} exact />
        <AdminRoute path="/admin/products/:id" component={AdminViewProduct} exact />
        <AdminRoute path="/admin/products/:id/edit" component={AdminUpdateProduct} exact />

        <AdminRoute path="/admin/addresses" component={AdminAddresses} exact />
        <AdminRoute path="/admin/addresses/new" component={AdminCreateAddress} exact />
        <AdminRoute path="/admin/addresses/:id/edit" component={AdminUpdateAddress} exact />

        <AdminRoute path="/admin/users" component={AdminUsers} exact />
        <AdminRoute path="/admin/users/:id" component={AdminUpdateUser} exact />
        <AdminRoute path="/admin/users/:id/edit" component={AdminUpdateUser} exact />

        <AdminRoute path="/admin/orders" component={AdminUserCampaigns} exact />
        <AdminRoute path="/admin/orders/:id" component={AdminUserCampaign} exact />

        <Route component={NotFound} />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetLayout,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(withChat(withAnalytics(Routes)))
