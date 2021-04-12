import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, withStyles } from '@material-ui/core'
import { useDebouncedCallback } from 'use-debounce'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

const styles = () => ({
  input: {
    width: '40px',
    textAlign: 'right',
  },
})

const QuantityControl = ({
  min = 1,
  max = null,
  value = min,
  onChange = () => {},
  debounced = false,
  step = 1,
}) => {
  const [currentValue, setCurrentValue] = useState(1)

  // Reset quantity on value change
  useEffect(() => setCurrentValue(value), [value])

  const [debouncedOnChange] = useDebouncedCallback(onChange, 500)

  const handleOnChange = newValue => {
    setCurrentValue(newValue)
    debounced ? debouncedOnChange(newValue) : onChange(newValue)
  }

  const incQuantity = e => {
    if (max === null || currentValue < max) {
      const newValue = currentValue + step
      handleOnChange(newValue)
    }
  }

  const decQuantity = e => {
    if (currentValue > min) {
      const newValue = currentValue - step
      handleOnChange(newValue)
    }
  }

  return (
    <Box display="flex" flexWrap="nowrap">
      <ButtonGroup size="small">
        <Button onClick={decQuantity}>
          <Remove />
        </Button>
        <Button>{currentValue}</Button>
        <Button onClick={incQuantity} type="button">
          <Add />
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default withStyles(styles)(QuantityControl)
