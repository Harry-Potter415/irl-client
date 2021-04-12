import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { withAlerts } from '../../../hocs/withAlerts'
import { resetPassword } from '../../../actions/auth'
import { globalStyles } from '../../../components/globalStyles'
import { validatePassword } from '../../../helpers/validations/user'
import Column from '../../../components/layout/Column'
import TextInput from 'components/inputs/TextInput'
import Button from '@material-ui/core/Button'
import queryString from 'query-string'
import FormHeader from 'components/layout/FormHeader'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      resetPasswordToken: null,
      errors: {},
    }
  }

  componentDidMount(props) {
    let qs = queryString.parse(this.props.location.search)
    this.setState({
      resetPasswordToken: qs.reset_password_token,
    })
  }

  handleSubmit = async e => {
    const { resetPassword, showAlertSuccess, showAlertError, history } = this.props
    const { password, resetPasswordToken } = this.state

    e.preventDefault()
    let validate = validatePassword(password)
    if (validate.isValid) {
      try {
        const res = await resetPassword(password, resetPasswordToken)
        history.push('/login')
        showAlertSuccess(res.data.message)
      } catch (e) {
        if (e.status === 422) {
          e.data.errors.map(message => showAlertError(message))
        }
      }
    } else {
      this.setState({ errors: validate.errors })
    }
  }

  handleChange = event => {
    const { value } = event.target

    this.setState({
      password: value,
    })
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        <Column narrow={true}>
          <FormHeader title="Reset your password" />
          <form onSubmit={this.handleSubmit}>
            <TextInput
              fullWidth
              style={globalStyles.top20}
              name="password"
              label="Password"
              handleChange={this.handleChange}
              type="password"
              variant="outlined"
              placeholder="New password"
              error={errors.password}
            />
            <Button
              style={globalStyles.top20}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              label="Reset password"
            >
              Reset password
            </Button>
          </form>
        </Column>
      </div>
    )
  }
}

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

const mapDispatchToProps = dispatch => bindActionCreators({ resetPassword }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(ResetPassword)))
