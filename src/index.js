import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AUTHENTICATE_FROM_TOKEN } from './actions/actionTypes'
import configureStore  from './store/configureStore'
import HttpsRedirect from 'react-https-redirect'
import Layout  from './layout'
// Polyfills
import 'url-search-params-polyfill'
import 'custom-event-polyfill'

export const store = configureStore()

// Check for token and update application state if required
const authToken = localStorage.getItem('authToken')
if (authToken) {
  store.dispatch({
    type: AUTHENTICATE_FROM_TOKEN,
    authToken: authToken,
  })
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <Layout />
    </HttpsRedirect>
  </Provider>,
  rootElement
)
