import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { globalStyles } from '../../../components/globalStyles'

class CheckboxInput extends Component {
  render() {
    const { label, name, value, handleChange, error } = this.props

    return (
      <Fragment>
        <FormControlLabel
          style={globalStyles.top10}
          control={
            <Checkbox
              checked={value}
              onChange={handleChange}
              value={value}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
        <Typography color="error" variant="caption" gutterBottom>
          {error}
        </Typography>
      </Fragment>
    )
  }
}

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default CheckboxInput
