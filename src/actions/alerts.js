import { ALERT_SHOW, ALERT_HIDE } from 'actions/actionTypes'

const createAlertCallback = ({ defaultPersistence, alertProps }) => (
  message,
  persistence = defaultPersistence
) => dispatch => {
  const alert = {
    color: 'primary',
    ...alertProps,
    message,
  }
  dispatch(showAlert(alert))
  if (persistence) {
    setTimeout(() => dispatch(hideAlert()), persistence)
  }
}

/**
 * @param message
 * @param persistence How long to show (in ms), 0 means forever. Default: 10.000
 */
export const showAlertSuccess = createAlertCallback({
  defaultPersistence: 10000,
  alertProps: { variant: 'success' },
})
/**
 * @param message
 * @param persistence How long to show (in ms), 0 means forever. Default: 10.000
 */
export const showAlertWarning = createAlertCallback({
  defaultPersistence: 10000,
  alertProps: { variant: 'warning' },
})
/**
 * @param message
 * @param persistence How long to show (in ms), 0 means forever. Default: 0
 */
export const showAlertError = createAlertCallback({
  defaultPersistence: 0,
  alertProps: { variant: 'error' },
})

export const showAlert = alert => dispatch => {
  dispatch({
    type: ALERT_SHOW,
    alert: alert,
  })
}

export const hideAlert = () => ({
  type: ALERT_HIDE,
})
