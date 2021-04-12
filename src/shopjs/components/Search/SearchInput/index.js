import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import { Clear, Search } from '@material-ui/icons'
import { syntheticEvent } from 'shopjs/helpers/utils'
import styled from 'styled-components'

const StyledTextField = styled(TextField)`
  background-color: white !important;
  opacity: 0.95 !important;
`

const StyledIconButton = styled(IconButton)`
  margin-right: -8px !important;
  padding: 4px !important;
`

const ClearIcon = styled(Clear)`
  width: 16px;
  height: 16px;
`

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  handleClearClick = () => {
    const { name, handleChange, handleClearClick } = this.props
    let e = syntheticEvent('', name)
    handleClearClick()
    handleChange(e)
  }

  handleChange = ev => {
    let { required, handleChange } = this.props
    let { value } = ev.target
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

  render() {
    const { name, value, placeholder, onKeyPress } = this.props

    let { error } = this.state

    return (
      <StyledTextField
        type="text"
        error={error}
        fullWidth
        name={name}
        placeholder={placeholder}
        margin="normal"
        onKeyPress={onKeyPress}
        variant="outlined"
        onChange={e => this.handleChange(e)}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment:
            value && value.length > 0 ? (
              <InputAdornment position="end">
                <StyledIconButton onClick={this.handleClearClick}>
                  <ClearIcon />
                </StyledIconButton>
              </InputAdornment>
            ) : null,
        }}
      />
    )
  }
}

SearchInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default SearchInput
