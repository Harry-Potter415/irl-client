import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Clear from '@material-ui/icons/Clear'
import { globalStyles } from 'shopjs/helpers/globalStyles'
import { syntheticEvent } from 'shopjs/helpers/utils'

const styles = {
  input: {
    backgroundColor: '#fff',
    opacity: '0.7',
    borderRadius: '4px',
  },
  IconButton: {
    padding: '5px',
  },
  icon: {
    fontSize: '16px',
    color: '#888',
  },
}

class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  handleClearClick = () => {
    const { name, handleChange } = this.props
    let e = syntheticEvent('', name)
    handleChange(e)
  }

  handleChange = ev => {
    let { required, handleChange } = this.props
    let { name, value } = ev.target
    if (required && value === '') {
      this.setState({
        error: true,
      })
    } else {
      this.setState({
        error: false,
      })
    }
    handleChange(ev)
  }

  focusInput = input => {
    const { focus } = this.props
    if (focus) {
      return input && input.focus()
    }
  }

  render() {
    const {
      style,
      required,
      label,
      type,
      name,
      value,
      focus,
      multiline,
      rows,
      placeholder,
      onKeyPress,
      isClearable,
      margin = 'dense',
    } = this.props

    let { error } = this.state

    return (
      <FormControl fullWidth style={style}>
        <Typography variant="caption">
          {label} {label && required && '*'}
        </Typography>
        <TextField
          inputRef={this.focusInput}
          error={error}
          rows={rows}
          style={styles.input}
          multiline={multiline}
          autoComplete="off"
          fullWidth
          type={type}
          name={name}
          placeholder={placeholder}
          margin={margin}
          onKeyPress={onKeyPress}
          variant="outlined"
          onChange={e => this.handleChange(e)}
          value={value}
          InputProps={{
            endAdornment: isClearable ? (
              <InputAdornment position="end">
                {value && (
                  <IconButton style={styles.iconButton} onClick={this.handleClearClick}>
                    <Clear style={styles.icon} />
                  </IconButton>
                )}
              </InputAdornment>
            ) : null,
          }}
        />
      </FormControl>
    )
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default TextInput
