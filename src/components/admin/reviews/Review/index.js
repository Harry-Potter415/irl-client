import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import DetailsHeroCard from 'components/details/DetailsHeroCard'
import DetailsGridSection from 'components/details/DetailsGridSection'
import DetailsGridCard from 'components/details/DetailsGridCard'
import DetailsListItem from 'components/details/DetailsListItem'
import styled from 'styled-components'
import { REVIEW_DISPLAY_STATUSES } from 'lib/constants'
import EventIcon from '@material-ui/icons/Event'
import moment from 'moment'

const styles = {
  detailGridCard: {
    minHeight: '300px',
  },
}
const Description = styled(Typography)`
  white-space: pre-wrap;
`
const Email = styled(Typography)`
  && {
    text-transform: none;
    font-size: 16px;
  }
`

class Review extends Component {
  render() {
    const { review } = this.props
    const editUrl = ''
    const approveUrl = ''

    const deleteButton = ''
    const canEdit = false

    return (
      <Fragment>
        <DetailsHeroCard
          editHref={editUrl}
          approveHref={approveUrl}
          DeleteButton={deleteButton}
          canEdit={canEdit}
          imageUrl={review.product.imageUrl}
        >
          <Email paragraph variant="caption">
            {review.userEmail}
          </Email>
          <Typography paragraph variant="h3">
            {review.userName}
          </Typography>
          <Description variant="body1">{review.comment}</Description>
        </DetailsHeroCard>
        <DetailsGridSection header={'Review Details'}>
          <DetailsGridCard size={4} style={styles.detailGridCard}>
            <DetailsListItem icon="star" label="Rating" value={review.rating} />
          </DetailsGridCard>
          <DetailsGridCard size={4} style={styles.detailGridCard}>
            <DetailsListItem
              icon="home"
              label="Status"
              value={REVIEW_DISPLAY_STATUSES[review.status]}
            />
          </DetailsGridCard>
          <DetailsGridCard size={4} style={styles.detailGridCard}>
            <DetailsListItem
              icon={<EventIcon />}
              label="Created At"
              value={moment(review.createdAt).format('MM-DD-YYYY HH:mm')}
            />
          </DetailsGridCard>
        </DetailsGridSection>
      </Fragment>
    )
  }
}

Review.propTypes = {
  review: PropTypes.object,
}

export default Review
