import React from 'react'
import { StyledBox, StyledButton } from './styles'

const Image = ({ imageUrl, height = '220px', width = '220px', onClick }) => {
  let styles = {
    image: {
      backgroundImage: `url(${imageUrl})`,
      width: width,
      height: height,
    },
  }

  return onClick ? (
    <StyledButton fullWidth onClick={onClick}>
      <StyledBox style={styles.image} />
    </StyledButton>
  ) : (
    <StyledBox style={styles.image} />
  )
}

export default Image
