import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import { isMobile } from 'helpers/utils'

class Title extends Component {
  render() {
    return <Typography variant={isMobile() ? 'h5' : 'h3'}>{this.props.children}</Typography>
  }
}

export default Title
