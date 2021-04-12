import { IS_FETCHING_REQUEST, IS_FETCHING_SUCCESS, IS_FETCHING_FAILURE } from './actionTypes'

// generic fetching / loading dispatch
export const isFetchingRequest = () => ({
  type: IS_FETCHING_REQUEST,
})

export const isFetchingSuccess = () => ({
  type: IS_FETCHING_SUCCESS,
})

// generic failure dispatch
export const isFetchingFailure = error => ({
  type: IS_FETCHING_FAILURE,
  error: error,
})

export const fetchingRequest = () => dispatch => {
  dispatch(isFetchingRequest())
}

export const fetchingSuccess = () => dispatch => {
  dispatch(isFetchingSuccess())
}

export const fetchingFailure = error => dispatch => {
  dispatch(isFetchingFailure(error))
}
