import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Rating from 'components/inputs/Rating'
import { formatShortDate } from 'helpers/utils'

const StyledListItem = styled(ListItem)`
  margin-top: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
`
const ReviewText = styled(Typography)`
  && {
    padding-left: 2px;
    margin-top: 0.5rem;
  }
`
const Date = styled(Typography)`
  && {
    padding-left: 2px;
    font-size: 12px;
  }
`
const RatingContainer = styled.div`
  .rating {
    margin-top: 0.5rem;
  }
`

class ReviewsList extends Component {
  renderRating = rating => {
    return (
      <RatingContainer>
        <Rating value={rating} readOnly={true} />
      </RatingContainer>
    )
  }

  initials = name => {
    const split = name.split(' ')
    return split[1] ? split[0][0] + split[1][0] : split[0][0]
  }

  render() {
    const { reviews } = this.props
    return (
      <List>
        {reviews.map(review => {
          return (
            <StyledListItem>
              <ListItemText>
                {this.renderRating(review.rating)}
                <ReviewText variant="body1">{review.userName}</ReviewText>
                <Date variant="body1">{formatShortDate(review.createdAt)}</Date>
                <ReviewText variant="body1">{review.comment}</ReviewText>
              </ListItemText>
            </StyledListItem>
          )
        })}
      </List>
    )
  }
}

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired,
}

export default ReviewsList
