import React, { useEffect } from 'react'
import { Box, withStyles } from '@material-ui/core'
import { useDebouncedCallback } from 'use-debounce'
import SelectInput from 'components/inputs/SelectInput'
import { range } from 'lodash'

const styles = () => ({
  input: {
    width: '40px',
    textAlign: 'right',
  },
})

const DropdownQuantityControl = ({
  value,
  onChange = () => {},
  debounced = false,
  casePack,
  minOrder,
  price,
  width,
}) => {
  let minValue = minOrder / price
  minValue = Math.ceil(minValue / casePack) * casePack

  useEffect(() => {
    if (!value || value === 1) onChange(minValue)
  }, [value, minValue, onChange])

  const [debouncedOnChange] = useDebouncedCallback(onChange, 500)

  const handleOnChange = newValue => {
    debounced ? debouncedOnChange(newValue) : onChange(newValue)
  }

  const generateOption = n => {
    const option = minValue + n * casePack
    return { [option]: option }
  }

  let quantityOptions = {}
  range(0, 100).forEach(n => {
    const option = generateOption(n)
    quantityOptions = { ...quantityOptions, ...option }
  })

  return (
    <Box display="flex" flexWrap="nowrap" width={width || 200}>
      <SelectInput
        name="status"
        label="Quantity"
        options={quantityOptions}
        value={value || minValue}
        handleChange={e => handleOnChange(parseInt(e.target.value))}
      />
    </Box>
  )
}

export default withStyles(styles)(DropdownQuantityControl)
