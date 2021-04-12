import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { withAlerts } from 'hocs/withAlerts'
import Column from 'components/layout/Column'
import { Link } from 'react-router-dom'
import { loginUser } from 'actions/auth'
import { globalStyles } from 'components/globalStyles'
import Button from '@material-ui/core/Button'
import FormHeader from 'components/layout/FormHeader'
import TextField from '@material-ui/core/TextField'
import { setToken } from 'helpers/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async e => {
    const { loginUser, showAlertSuccess, showAlertError } = this.props

    const { email, password } = this.state
    e.preventDefault()
    this.setState({
      password: null,
    })
    try {
      let user = await loginUser(email, password)
      setToken(user)
      showAlertSuccess('Successfully logged in')
    } catch (e) {
      if (e.status === 401) {
        showAlertError('The email or password is incorrect')
      }
    }
  }

  handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, password } = this.state

    return (
      <div>
        <Column narrow={true}>
          <FormHeader title="Sign In" subtitle="Welcome back" />
          <form onSubmit={this.handleSubmit}>
            <TextField
              style={globalStyles.top20}
              fullWidth
              name="email"
              label="Email"
              placeholder="Enter email ..."
              onChange={this.handleChange}
              value={email}
              variant="outlined"
            />
            <TextField
              style={globalStyles.top20}
              fullWidth
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password ..."
              onChange={this.handleChange}
              variant="outlined"
              value={password}
            />
            <Button
              style={globalStyles.top20}
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign in
            </Button>
          </form>
          <p style={globalStyles.top20}>
            <Link to="/forgotPassword">Forgot your password?</Link>
          </p>
        </Column>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch)

const mapStateToProps = state => {
  const { authenticated } = state.auth
  const { isFetched, isFetching, error } = state.loaders
  return {
    authenticated,
    isFetched,
    isFetching,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(Login)))
