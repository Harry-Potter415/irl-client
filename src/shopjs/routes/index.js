import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { AuthRoute } from 'shopjs/components'
import { lazy } from 'react'
const Home = lazy(() => import('shopjs/containers/Home'))
const SearchList = lazy(() => import('shopjs/components/Search/SearchList'))
const ProductShow = lazy(() => import('shopjs/components/Products/ProductShow'))
const VendorList = lazy(() => import('shopjs/components/Vendor/VendorList'))
const CollectionList = lazy(() => import('shopjs/components/Collections/CollectionList'))
const CartList = lazy(() => import('shopjs/components/Cart/CartList'))
const Login = lazy(() => import('shopjs/components/Auth/Login'))
const Signup = lazy(() => import('shopjs/components/Auth/Signup'))
const Signout = lazy(() => import('shopjs/components/Auth/Signout'))
const OrdersList = lazy(() => import('shopjs/components/Orders/OrdersList'))
const OrderDetails = lazy(() => import('shopjs/components/Orders/OrderDetails'))
const AccountAddress = lazy(() => import('shopjs/components/Account/AccountAddress'))
const AccountDetails = lazy(() => import('shopjs/components/Account/AccountDetails'))

export default () => (
  <Switch>
    <AuthRoute exact marketingSubscribe path="/" component={Home} />
    <AuthRoute exact path="/search" component={SearchList} />
    <AuthRoute exact marketingSubscribe path="/products/:productHandle" component={ProductShow} />
    <AuthRoute exact path="/brands/:brandHandle" component={VendorList} />
    <AuthRoute exact path="/collections/:collectionHandle" component={CollectionList} />
    <AuthRoute
      exact
      path="/collections/:collectionHandle/products/:productHandle"
      component={ProductShow}
    />
    <AuthRoute exact path="/cart" component={CartList} />
    <AuthRoute exact path="/login" component={Login} />
    <AuthRoute exact path="/signup" component={Signup} />
    <AuthRoute loggedIn exact path="/signout" component={Signout} />
    <AuthRoute loggedIn exact path="/account" component={AccountDetails} />
    <AuthRoute loggedIn exact path="/account/address" component={AccountAddress} />
    <AuthRoute loggedIn exact path="/orders" component={OrdersList} />
    <AuthRoute loggedIn exact path="/orders/:number" component={OrderDetails} />
    <Redirect to="/" />
  </Switch>
)
