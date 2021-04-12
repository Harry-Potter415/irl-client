import { ACTIONS } from 'actions/uploader'

const initialState = {}

const uploader = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.START_UPLOAD:
      return {
        ...state,
        [action.uploaderId]: {
          isUploading: true,
        },
      }
    case ACTIONS.FINISH_UPLOAD:
      return {
        ...state,
        [action.uploaderId]: {
          isUploading: false,
        },
      }
    default:
      return state
  }
}

export default uploader
