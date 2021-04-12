import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { handleChange, saveResource } from 'helpers/components'
import Button from '@material-ui/core/Button'
import FormContainer from 'components/layout/FormContainer'
import FormHeader from 'components/layout/FormHeader'

class Form extends Component {
  constructor(props) {
    super(props)

    const { resourceName, validateFunction, action, message, urlPrefix, callback } = this.props

    this.state = {
      [resourceName]: { ...this.props.initialValues },
      errors: {},
    }

    this.handleChange = handleChange.bind(this, resourceName)
    this.handleSave = saveResource.bind(this, {
      resourceName,
      validateFunction,
      action,
      urlPrefix,
      history: props.history,
      message,
      callback,
    })
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setResourceState(this.props)
  }

  setResourceState(props) {
    const { initialValues, resourceName } = props

    if (props.initialValues) {
      this.setState({ [resourceName]: { ...initialValues } })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.handleSave()
  }

  render() {
    const {
      width = '100%',
      saveText,
      justify,
      resourceName,
      submitDisabled,
      md,
      title,
      subtitle,
      marginLeft,
    } = this.props
    return (
      <FormContainer md={md} justify={justify}>
        <FormHeader title={title || ''} subtitle={subtitle || ''} />
        <form onSubmit={this.onSubmit}>
          {this.props.children(this.handleChange, this.state[resourceName], this.state.errors)}
          <Button
            style={{ marginTop: '20px', width: width, marginLeft: marginLeft }}
            color="primary"
            variant="contained"
            type="submit"
            disabled={submitDisabled}
          >
            {saveText}
          </Button>
        </form>
      </FormContainer>
    )
  }
}

Form.propTypes = {
  children: PropTypes.func.isRequired,
  resourceName: PropTypes.string.isRequired,
  validateFunction: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  urlPrefix: PropTypes.string.isRequired,
  callback: PropTypes.func,
  submitDisabled: PropTypes.bool,
}

Form.defaultProps = {
  children: () => {},
  initialValues: {},
  urlPrefix: '',
  submitDisabled: false,
}

export default withRouter(Form)
