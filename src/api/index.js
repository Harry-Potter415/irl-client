import axios from 'axios'
import config from 'config'
import { showAlertError } from 'actions/alerts'
import { store } from 'index'
import get from 'lodash/get'
import { removeToken } from 'helpers/auth'

const headers = { 'Content-Type': 'application/json' }

const api = axios.create({
  baseURL: config.REACT_APP_API_URL,
  headers,
  timeout: 200000,
})

api.interceptors.response.use(
  resp => Promise.resolve(resp),
  error => {
    if (get(error, 'response.status') === 401) {
      removeToken()
      if (window.location.pathname !== '/login') {
        window.location.pathname = '/login'
      }
    }
    const errorResponse = get(error, 'response.data.error')
    if (errorResponse && typeof errorResponse === 'object') {
      Object.values(errorResponse).forEach(message => {
        showAlertError(`${error.response.status}: ${message}`)(store.dispatch)
      })
    } else if (get(error, 'response.status') === 500) {
      showAlertError('500 - Internal server error')(store.dispatch)
    } else {
      showAlertError(`Error: ${get(error, 'response.status', 'unknown')}`)(store.dispatch)
    }
    console.error(error)
    return Promise.reject(error.response)
  }
)

export default api
