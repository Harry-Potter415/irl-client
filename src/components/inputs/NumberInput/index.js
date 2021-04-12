import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const NumberInput = ({ name, label, value, handleChange }) => {
  const styles = {
    input: {
      height: '0',
      width: '3rem',
      padding: '16px 0',
      textAlign: 'center',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      padding: '0.5rem 0',
    },
    inputBlock: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: -4,
    },
    label: {
      width: '70%',
    },
  }

  const IncrementButton = styled.div`
    width: 2rem;
    height: 2rem;
    border: solid 1px #e1e1e1;
    font-size: 1.5rem;
    text-align: center;
    cursor: pointer;
  `

  const _handleChange = value => {
    value = parseInt(value)
    if (isNaN(value)) value = ''
    if (value < 0) value = 0
    handleChange(value)
  }

  const increment = value => {
    value = parseInt(value)
    if (isNaN(value)) return handleChange(1)
    handleChange(value + 1)
  }

  const decrement = value => {
    value = parseInt(value)
    if (isNaN(value) || value <= 0) return handleChange(0)
    handleChange(value - 1)
  }

  return (
    <div style={styles.container}>
      <Typography variant="caption" style={styles.label}>
        {label}
      </Typography>
      <div style={styles.inputBlock}>
        <IncrementButton onClick={() => decrement(value)}>-</IncrementButton>
        <TextField
          name={name}
          variant="outlined"
          value={value}
          inputProps={{ style: styles.input }}
          onChange={e => _handleChange(e.target.value)}
        />
        <IncrementButton onClick={() => increment(value)}>+</IncrementButton>
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default NumberInput
