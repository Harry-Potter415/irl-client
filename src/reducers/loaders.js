import {
  IS_FETCHING_REQUEST,
  IS_FETCHING_SUCCESS,
  IS_FETCHING_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
}

const loaders = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        error: null,
      }
    case IS_FETCHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: null,
      }

    case IS_FETCHING_FAILURE:
      return {
        isFetching: false,
        isFetched: false,
        error: action.error,
      }
    default:
      return {
        ...state,
      }
  }
}

export default loaders
