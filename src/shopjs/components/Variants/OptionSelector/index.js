import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { OptionButton } from 'shopjs/components'
import { IGNORE_SHOPIFY_OPTIONS } from 'lib/constants'

const OptionSelector = ({ option, selectedOptions, selectOption }) => {
  const handleOptionClick = value => {
    selectOption(option.name, value)
  }
  const selectedValue = selectedOptions[option.name]
  return !IGNORE_SHOPIFY_OPTIONS.includes(option.name) ? (
    <Box display="flex" flexDirection="column" my={1}>
      <Typography variant="caption">{option.name}</Typography>
      <Box>
        {option.values &&
          option.values.map(value => (
            <OptionButton
              key={value}
              value={value}
              selectedValue={selectedValue}
              handleClick={handleOptionClick}
            />
          ))}
      </Box>
    </Box>
  ) : null
}

export default OptionSelector
