import React, { Component } from 'react'
import { Dialog as MuiDialog } from '@material-ui/core'
import { theme } from 'components/theme'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  paper: {
    boxShadow: theme.shadows[3],
  },
}

class Dialog extends Component {
  render() {
    return <MuiDialog {...this.props}>{this.props.children}</MuiDialog>
  }
}

export default withStyles(styles)(Dialog)
