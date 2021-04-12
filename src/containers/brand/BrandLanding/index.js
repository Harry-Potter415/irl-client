import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withAlerts } from '../../../hocs/withAlerts'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class BrandLanding extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Brands Landing</Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(withRouter(withAlerts(BrandLanding)))
