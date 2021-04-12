import { ALERT_SHOW, ALERT_HIDE } from '../actions/actionTypes'

const initialState = {
  alert: null,
}

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_HIDE:
      return {
        alert: null,
      }
    case ALERT_SHOW:
      return {
        alert: action.alert,
      }
    default:
      return state
  }
}

export default alerts
