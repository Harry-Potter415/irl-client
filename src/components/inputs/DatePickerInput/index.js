import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import Typography from '@material-ui/core/Typography'
import MomentUtils from '@date-io/moment'
import { globalStyles } from 'components/globalStyles'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import { theme } from 'components/theme'

const StyledCloseIcon = styled(CloseIcon)`
  && {
    position: absolute;
    top: 22px;
    right: 4px;
    color: ${theme.palette.text.secondary};
    font-size: 18px;
    cursor: pointer;
  }
`

class DatePickerInput extends Component {
  render() {
    const { label, name, placeholder, handleChange, error } = this.props
    let { value } = this.props
    // required for blank field
    if (value === undefined) value = null
    return (
      <FormControl fullWidth style={globalStyles.top10}>
        <Typography variant="caption" gutterBottom>
          {label}
        </Typography>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            inputVariant="outlined"
            value={value}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            error={Boolean(error)}
          />
          {value && <StyledCloseIcon onClick={() => handleChange(null)} className="close-icon" />}
        </MuiPickersUtilsProvider>
        <Typography color="error" variant="caption" gutterBottom>
          {error}
        </Typography>
      </FormControl>
    )
  }
}

export default DatePickerInput
