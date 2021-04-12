import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as alertActions from '../../../actions/alerts'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import amber from '@material-ui/core/colors/amber'
import yellow from '@material-ui/core/colors/yellow'
import { theme } from 'components/theme'

const styles = {
  success: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: yellow[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  variantIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: '10px',
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}

class Alert extends Component {
  handleClose = () => {
    const { hideAlert } = this.props
    hideAlert()
  }

  render() {
    const { alert } = this.props
    return alert ? (
      <Snackbar
        open={!!alert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SnackbarContent
          style={styles[alert.variant]}
          onClose={this.handleClose}
          message={<span style={styles.message}>{alert.message}</span>}
          autoHideDuration={3000}
          action={[
            <IconButton key="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon style={styles.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    ) : null
  }
}

const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(alertActions.hideAlert()),
})

const mapStateToProps = state => ({
  alert: state.alerts.alert,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert)
