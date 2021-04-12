import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography, Divider } from '@material-ui/core'
import DetailsHeroCard from 'components/details/DetailsHeroCard'
import { isAuthorized } from 'helpers/auth'
import { selectCurrentUser } from 'selectors/auth'
import DeleteButton from 'components/layout/DeleteButton'
import styled from 'styled-components'
import Rating from 'components/inputs/Rating'
import ReviewsList from 'components/reviews/ReviewsList'
import { orderBy } from 'lodash'

const Description = styled(Typography)`
  white-space: pre-wrap;
`
const ReviewsHeader = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
`
const BasedOn = styled(Typography)`
  && {
    margin-top: 0.5rem;
  }
`

class Product extends Component {
  render() {
    const { product, deleteProduct, currentUser } = this.props
    const isAdmin = currentUser ? currentUser.attributes.isAdmin : false
    const editUrl = isAdmin ? `/admin/products/${product.id}/edit` : `/products/${product.id}/edit`
    const approveUrl = isAdmin ? `/admin/products/${product.id}/approve-images` : null

    const deleteButton = <DeleteButton title={`Delete ${product.title}`} action={deleteProduct} />
    const canEdit = isAuthorized(currentUser, 'edit', 'products', product)

    return (
      <Fragment>
        <DetailsHeroCard
          editHref={editUrl}
          approveHref={approveUrl}
          DeleteButton={deleteButton}
          canEdit={canEdit}
          imageUrl={product.imageUrl}
        >
          <Typography paragraph variant="caption">
            {product.user.company}
          </Typography>
          <Typography paragraph variant="h3">
            {product.title}
          </Typography>
          <Description variant="body1">{product.description}</Description>
          <Divider />
          <Typography paragraph variant="h4">
            Promo
          </Typography>
          <Typography paragraph variant="h6">
            {product.promoTitle}
          </Typography>
          <Typography paragraph variant="h6">
            {product.promoCode}
          </Typography>
          <Description variant="body1">{product.promoDescription}</Description>
        </DetailsHeroCard>
        <ReviewsHeader>
          <Typography paragraph variant="h3">
            Reviews
          </Typography>
          <Typography paragraph variant="h1">
            {parseFloat(product.averageRating).toFixed(1)}/5
          </Typography>
          <Rating value={parseFloat(product.averageRating).toFixed(1)} readOnly={true} />
          <BasedOn variant="body1">{`Based on ${product.reviews.length} reviews`}</BasedOn>
        </ReviewsHeader>
        <ReviewsList reviews={orderBy(product.reviews, 'createdAt', 'desc')} />
      </Fragment>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object,
  deleteProduct: PropTypes.func,
  isAdmin: PropTypes.bool,
}

Product.defaultProps = {
  isAdmin: false,
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(Product)
