import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

class Item extends Component {
  render() {
    return (
      <Grid item xs={12} sm={4} md={4} lg={4} {...this.props}>
        {this.props.children}
      </Grid>
    )
  }
}

export default Item
