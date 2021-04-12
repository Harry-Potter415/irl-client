import axios from 'axios'

const authMiddleware = store => next => action => {
  let token = store.getState().auth.authToken
  if (token) {
    // After login or signup set the auth token from state
    axios.defaults.headers.common['Authorization'] = `${token}`
  } else {
    // on page reload, get the token from localStorage
    token = localStorage.getItem('authToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`
    }
  }

  return next(action)
}

export default authMiddleware
