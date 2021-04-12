import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { ShopifyProvider } from 'shopjs/context'
import { ScreenDimmer } from 'shopjs/components'
import App from './App'
import { selectCurrentCheckout } from 'selectors/auth'
import { BrowserRouter } from 'react-router-dom'

const Layout = props => {
  const { currentCheckout } = props
  return (
    <BrowserRouter>
      <ShopifyProvider currentCheckout={currentCheckout}>
        <Suspense fallback={<ScreenDimmer />}>
          <App />
        </Suspense>
      </ShopifyProvider>
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return {
    currentCheckout: selectCurrentCheckout(state),
  }
}

export default connect(mapStateToProps)(Layout)
