import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { globalStyles } from '../../../components/globalStyles'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledInputLabel = styled(InputLabel)`
  && {
    transform: translate(14px, 13px) scale(1);
  }
`

class SelectInput extends Component {
  constructor() {
    super()
    this.state = {
      labelWidth: 0,
    }
    this.inputLabel = React.createRef()
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.inputLabel.current)
    this.setState({ labelWidth: node.offsetWidth })
  }

  renderOptions(options, includeBlank) {
    const menuOptions = Object.keys(options).map((key, idx) => (
      <MenuItem value={key} key={idx}>
        {options[key]}
      </MenuItem>
    ))
    if (includeBlank)
      menuOptions.unshift(<MenuItem value={null} key={menuOptions.length}></MenuItem>)
    return menuOptions
  }

  render() {
    const { label, name, value, options, handleChange, includeBlank } = this.props
    const { labelWidth } = this.state

    return (
      <FormControl fullWidth style={globalStyles.top10} variant="outlined">
        <StyledInputLabel shrink={Boolean(value)} ref={this.inputLabel}>
          {label}
        </StyledInputLabel>
        <Select
          {...this.props}
          margin="dense"
          value={value}
          name={name}
          style={globalStyles.margin0}
          onChange={e => handleChange(e)}
          input={<OutlinedInput name={name} labelWidth={labelWidth} notched={Boolean(value)} />}
        >
          {options ? this.renderOptions(options, includeBlank) : null}
        </Select>
      </FormControl>
    )
  }
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default SelectInput
