import React from 'react'
import { StyledButton } from './styles'
import { get } from 'lodash'
import config from 'shopjs/config'

const ColorButton = ({ value, selectedValue, handleClick }) => {
  const selected = selectedValue === value

  let color = config.searchFilters['color'].find(c => c.value === value)
  let hexColor = get(color, 'hex')

  return (
    <StyledButton onClick={e => handleClick(value)}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <circle fill={hexColor || '#DDDDDD'} cx="16" cy="16" r="12" strokeWidth="0" />
        <circle
          cx="16"
          cy="16"
          r="15"
          stroke="black"
          strokeOpacity="0.2"
          strokeWidth="1"
          fill="none"
        />
        {selected && (
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="black"
            strokeOpacity="0.8"
            strokeWidth="1"
            fill="none"
          />
        )}
      </svg>
    </StyledButton>
  )
}

export default ColorButton
