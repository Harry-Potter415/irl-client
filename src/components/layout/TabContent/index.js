import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class TabContent extends Component {
  render() {
    return <Fragment>{this.props.children}</Fragment>
  }
}

TabContent.propTypes = {
  title: PropTypes.string.isRequired,
}

TabContent.defaultProps = {
  title: 'Tab',
}

export default TabContent
