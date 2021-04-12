import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withAlerts } from '../../../hocs/withAlerts'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Item from '../../../components/layout/Item'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { globalStyles } from '../../../components/globalStyles'
import css from './index.css'

const styles = {
  header: {
    fontSize: '42px',
    fontFamily: 'Oswald',
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: '20px auto 20px auto',
    lineHeight: '1.0em',
  },
}

class HomeLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: '',
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      keywords: value,
    })
  }

  handleClick = () => {
    const { history } = this.props
    const { keywords } = this.state
    history.push(`/profiles?${keywords}`)
  }

  render() {
    const { currentUser, authenticated, isFetching, isFetched } = this.props
    const { keywords } = this.state

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" style={styles.header}>
            Welcome to Rails React starter app
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { authenticated, currentUser, isFetched, isFetching } = state.auth
  return {
    authenticated,
    currentUser,
    isFetched,
    isFetching,
  }
}

export default connect(mapStateToProps)(withRouter(withAlerts(HomeLanding)))
