import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { default as MuiRating } from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/Favorite'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const Container = styled.div`
  margin-top: 1rem;
`

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(MuiRating)

class Rating extends Component {
  render() {
    const { readOnly, value, onChange, name } = this.props
    return (
      <Container className="rating">
        <StyledRating
          readOnly={readOnly}
          name={name}
          value={parseFloat(value)}
          precision={0.5}
          onChange={onChange}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </Container>
    )
  }
}

Rating.propTypes = {
  readOnly: PropTypes.bool,
}

export default Rating
