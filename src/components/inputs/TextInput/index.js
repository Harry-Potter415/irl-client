import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { globalStyles } from '../../../components/globalStyles'

class TextInput extends Component {
  render() {
    const {
      label,
      type,
      name,
      value,
      error,
      handleChange,
      onKeyPress,
      multiline,
      rows,
      style,
      placeholder,
      margin = 'dense',
      ...rest
    } = this.props
    const inputStyle = { ...style, ...globalStyles.top0 }
    const InputLabelProps = {}
    if (placeholder) {
      InputLabelProps.shrink = true
    }
    return (
      <FormControl fullWidth style={globalStyles.top10}>
        <TextField
          fullWidth
          type={type}
          name={name}
          label={label}
          placeholder={placeholder}
          margin={margin}
          onKeyPress={onKeyPress}
          style={inputStyle}
          variant="outlined"
          onChange={e => handleChange(e)}
          value={value}
          multiline={multiline}
          rows={rows}
          {
            // pass on specifically sent properties
            // NB: priority - props above this row can be overridden; props below, can't
            ...rest
          }
          error={Boolean(error)}
          InputLabelProps={InputLabelProps}
        />
        <Typography color="error" variant="caption" gutterBottom>
          {error}
        </Typography>
      </FormControl>
    )
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default TextInput
