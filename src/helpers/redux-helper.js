import { fetchingRequest, fetchingSuccess, fetchingFailure } from 'actions/loaders'

const REQUEST = '_REQUEST'
const FAILURE = '_FAILURE'

// remove _REQUEST and _FAILURE from action name to get the base action
const baseAction = actionName => {
  return actionName.replace(REQUEST, '').replace(FAILURE, '')
}

// check if it is a request action and belongs to the current reducer
const isRequestAction = (actionName, reducerActions) => {
  return actionName.includes(REQUEST) && reducerActions[baseAction(actionName)]
}

// check if it is a failure action and belongs to the current reducer
const isFailureAction = (actionName, reducerActions) => {
  return actionName.includes(FAILURE) && reducerActions[baseAction(actionName)]
}

export const dispatchAction = (actionName, apiRequest, meta) => dispatch => {
  // dispatch request
  dispatch({ type: `${actionName}${REQUEST}` })
  dispatch(fetchingRequest())
  return apiRequest()
    .then(res => {
      // request success
      dispatch({ type: actionName, res: res.data, headers: res.headers, meta })
      dispatch(fetchingSuccess())
      return Promise.resolve(res)
    })
    .catch(error => {
      // request failure
      dispatch({ type: `${actionName}${FAILURE}`, error, meta })
      dispatch(fetchingFailure())
      console.error(error)
      return Promise.reject(error)
    })
}

export const request = action => {
  return `${action}${REQUEST}`
}

export const failure = action => {
  return `${action}${FAILURE}`
}

export const handleDefault = (state, action, reducerActions) => {
  let newState = { ...state }
  if (isRequestAction(action.type, reducerActions)) {
    newState = {
      ...state,
      isFetching: true,
      isFetched: false,
      error: null,
    }
  } else if (isFailureAction(action.type, reducerActions)) {
    newState = {
      ...state,
      isFetching: false,
      isFetched: false,
      error: action.error,
    }
  }
  return newState
}

export const successDefaults = {
  isFetching: false,
  isFetched: true,
  error: null,
}

export function paginationDefaults(action) {
  return {
    total: parseInt(action.headers.total),
    page: parseInt(action.headers.page),
    perPage: parseInt(action.headers['per-page']),
  }
}
