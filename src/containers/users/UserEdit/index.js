import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { fetchMe, updateUser } from 'actions/auth'
import { validateUpdateUser } from 'helpers/validations/user'
import { globalStyles } from 'components/globalStyles'
import Column from 'components/layout/Column'
import FormHeader from 'components/layout/FormHeader'
import UserForm from '../UserForm'
import Button from '@material-ui/core/Button'
import { selectCurrentUser } from 'selectors/auth'
import { selectIsFetching, selectIsFetched } from 'selectors/loaders'
import { handleChange } from 'helpers/components'
import { SOCIAL_MEDIA_NAMES } from 'helpers/user'

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      errors: {},
    }
    this.handleChange = handleChange.bind(this, 'user')
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    const { fetchMe } = this.props
    fetchMe()
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps
    if (currentUser) {
      const { attributes } = currentUser
      this.setState({
        user: {
          ...attributes,
          // in the backend, the social media links are aggregated into a json field:
          ...attributes.links,
        },
      })
    }
  }

  handleSave = async e => {
    const { fetchMe, updateUser, showAlertSuccess } = this.props

    let { user } = this.state

    e.preventDefault()
    const validate = validateUpdateUser(user)
    if (validate.isValid) {
      await updateUser({
        ...user,
        // in the backend, the social media links are aggregated into a json field
        links: SOCIAL_MEDIA_NAMES.reduce(
          (accu, crt) => ({
            ...accu,
            [crt]: user[crt],
          }),
          {}
        ),
      })
      fetchMe()
      showAlertSuccess('Successfully updated user')
    } else {
      this.setState({ errors: validate.errors })
    }
  }

  render() {
    let { user, errors } = this.state
    return (
      <div>
        <div>
          {user ? <FormHeader subtitle="Edit Account" title="My Account" /> : null}
          <Column>
            {user && (
              <form onSubmit={this.handleSave}>
                <UserForm user={user} handleChange={this.handleChange} errors={errors} />
                <Button
                  fullWidth
                  style={globalStyles.top20}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </form>
            )}
          </Column>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMe,
      updateUser,
    },
    dispatch
  )

const mapStateToProps = state => {
  const currentUser = selectCurrentUser(state)
  const isFetching = selectIsFetching(state)
  const isFetched = selectIsFetched(state)
  return {
    currentUser,
    isFetched,
    isFetching,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(UserEdit)))
