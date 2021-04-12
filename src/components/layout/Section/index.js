import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Section extends Component {
  getStyles = (maxWidth = 800, margin = 50) => {
    return {
      margin: `${margin}px auto ${margin}px auto`,
      maxWidth: `${maxWidth}px`,
    }
  }

  render() {
    const { maxWidth, margin } = this.props
    return <div style={this.getStyles(maxWidth, margin)}>{this.props.children}</div>
  }
}

Section.PropTypes = {
  maxWidth: PropTypes.number,
  margin: PropTypes.number,
}

export default Section
