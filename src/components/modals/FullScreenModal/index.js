import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

class FullScreenModal extends Component {
  state = {
    open: false,
  }

  toggleDialog = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const Component = this.props.component
    return (
      <Fragment>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} {...this.props}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Extra
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Secondary Button
              </Button>
            </Toolbar>
          </AppBar>
          <Component />
        </Dialog>
        <span onClick={this.toggleDialog}>{this.props.children}</span>
      </Fragment>
    )
  }
}

FullScreenModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FullScreenModal)
