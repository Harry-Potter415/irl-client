import React from 'react'
import { StyledButton } from './styles'

const OptionButton = ({ value, selectedValue, handleClick }) => {
  const selected = selectedValue === value
  return (
    <StyledButton
      active={selected}
      size="small"
      color={selected ? 'primary' : null}
      onClick={e => handleClick(value)}
    >
      {value}
    </StyledButton>
  )
}

export default OptionButton
