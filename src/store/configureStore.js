import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

import authMiddleware from '../middleware/auth'

const createStoreWithMiddleware = applyMiddleware(authMiddleware)(createStore)

export default function configureStore() {
  return createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
}
