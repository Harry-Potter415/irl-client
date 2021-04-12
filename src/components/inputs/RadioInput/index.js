import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { globalStyles } from '../../../components/globalStyles'

class RadioInput extends Component {
  render() {
    const { label, name, value, options, handleChange } = this.props

    return (
      <FormControl fullWidth component="fieldset" style={globalStyles.top10}>
        <Typography variant="caption" gutterBottom>
          {label}
        </Typography>
        <RadioGroup name={name} value={value} onChange={handleChange}>
          {options &&
            options.map((option, i) => (
              <FormControlLabel value={option.value} control={<Radio />} label={option.text} />
            ))}
        </RadioGroup>
      </FormControl>
    )
  }
}

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default RadioInput
