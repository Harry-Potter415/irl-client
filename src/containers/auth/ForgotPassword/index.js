import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from '../../../hocs/withAlerts'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../../actions/auth'
import { globalStyles } from '../../../components/globalStyles'
import Column from '../../../components/layout/Column'
import TextField from '@material-ui/core/TextField'
import FormHeader from 'components/layout/FormHeader'
import Button from '@material-ui/core/Button'

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
  }

  handleSubmit = async e => {
    const { forgotPassword, showAlertSuccess } = this.props
    const { email } = this.state
    e.preventDefault()
    try {
      await forgotPassword(email)
      showAlertSuccess('Please check your email for password reset instructions')
    } catch (e) {}
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
    return (
      <div>
        <Column narrow={true}>
          <FormHeader title="Reset your password" subtitle="Forgot Password" />
          <form onSubmit={this.handleSubmit} style={globalStyles.top20}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              onChange={this.handleChange}
              type="text"
              variant="outlined"
              placeholder="Enter your email"
            />
            <Button
              style={globalStyles.top20}
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              Send Instructions
            </Button>
            <p style={globalStyles.top20}>
              <Link to="/login">Sign in</Link> or <Link to="/signup">sign up</Link>
            </p>
          </form>
        </Column>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ forgotPassword }, dispatch)

const mapStateToProps = state => {
  const { isFetched, isFetching, error } = state.auth
  return {
    isFetched,
    isFetching,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(ResetPassword))
