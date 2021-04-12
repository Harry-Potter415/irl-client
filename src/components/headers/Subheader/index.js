import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
  subheader: {
    marginRight: '10px',
  },
}

class Subheader extends Component {
  render() {
    const { color, button, text } = this.props
    return (
      <AppBar color={color ? color : 'default'} position="static">
        <Toolbar variant="dense">
          <Typography style={styles.subheader} variant="subheading" color="inherit">
            {text}
          </Typography>
          {button ? button : null}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Subheader
