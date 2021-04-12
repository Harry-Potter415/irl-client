import React from 'react'
import { Box } from '@material-ui/core'
import { StyledBox } from './styles'
import { ColorButton } from 'shopjs/components'

const ColorSelector = ({ option, selectedOptions, selectOption }) => {
  const handleOptionClick = value => {
    selectOption(option.name, value)
  }

  const selectedValue = selectedOptions['Color']

  return (
    <StyledBox display="flex">
      {option &&
        option.values &&
        option.values.map((color, i) => (
          <Box key={`${i} ${color}`}>
            <ColorButton
              key={i}
              value={color}
              handleClick={handleOptionClick}
              selectedValue={selectedValue}
            />
          </Box>
        ))}
    </StyledBox>
  )
}

export default ColorSelector
