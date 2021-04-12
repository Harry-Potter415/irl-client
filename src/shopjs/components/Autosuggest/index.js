import React, { Component } from 'react'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography'
import { syntheticEvent } from 'shopjs/helpers/utils'
import { selectStyles } from 'shopjs/components/Autosuggest/styles'

class Autosuggest extends Component {
  state = {
    styles: {},
    selectedOption: null,
  }

  componentDidMount() {
    let { value, options } = this.props
    if (value) {
      this.setInitialValue(value, options)
    }
  }

  componentWillReceiveProps(nextProps) {
    let { value } = nextProps
    if (value && value !== this.props.value) {
      this.setInitialValue(value, this.props.options)
    }
  }

  setInitialValue = (value, options) => {
    let selectedOption = options.find(o => o.value === value)
    this.setState({
      selectedOption,
    })
  }

  handleExpand = () => {
    const { position } = this.props
    if (position === 'static') {
      this.setState({
        styles: {
          height: '340px',
        },
      })
    }
  }

  handleShrink = () => {
    this.setState({
      styles: {},
    })
  }

  handleChange = selectedOption => {
    const { handleChange, name, multiselect } = this.props
    this.setState({
      selectedOption,
    })
    let value
    if (multiselect) {
      value = selectedOption.map(o => o && o.value)
    } else {
      value = selectedOption && selectedOption.value
    }
    let ev = syntheticEvent(value, name)
    handleChange(ev)
  }

  render() {
    const { options, label, placeholder, multiselect } = this.props

    const { styles, selectedOption } = this.state

    return (
      <div style={styles}>
        <Typography variant="caption">{label}</Typography>
        <Select
          isClearable
          placeholder={placeholder}
          isMulti={!!multiselect}
          styles={selectStyles}
          value={selectedOption}
          onChange={this.handleChange}
          onMenuClose={this.handleShrink}
          onMenuOpen={this.handleExpand}
          options={options}
        />
      </div>
    )
  }
}

export default Autosuggest
