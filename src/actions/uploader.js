export const ACTIONS = {
  START_UPLOAD: 'START_UPLOAD',
  FINISH_UPLOAD: 'FINISH_UPLOAD',
}

export const startUpload = uploaderId => dispatch => {
  dispatch({ type: ACTIONS.START_UPLOAD, uploaderId })
}

export const finishUpload = uploaderId => dispatch => {
  dispatch({ type: ACTIONS.FINISH_UPLOAD, uploaderId })
}
