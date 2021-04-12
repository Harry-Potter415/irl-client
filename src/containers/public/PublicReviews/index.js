import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import withAnalytics from 'hocs/withAnalytics'
import { getUser, createReview, updateReview, setReviewsUser } from 'actions/public/reviews'
import { selectUser } from 'selectors/public/reviews'
import { Grid } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import CreateProductReview from 'components/public/reviews/CreateProductReview'
import StepWizard from 'components/layout/StepWizard'
import UserDetails from 'components/public/reviews/UserDetails'
import { handleChange } from 'helpers/components'
import MyRewards from 'components/public/reviews/MyRewards'
import { validateReviewer } from 'helpers/validations/review'
import styled from 'styled-components'
import normalize from 'jsonapi-normalizer'

const REVIEWS_KEY = userId => `reviews-${userId}`
const REVIEWER_KEY = 'reviewerData'

const Container = styled(Grid)`
  padding-bottom: 4rem;
`

class PublicReviews extends Component {
  constructor(props) {
    super()
    const { userId } = props.match.params
    const data = this.getLocalData(userId)
    const { reviews, reviewer, reviewerSubmitted } = data
    this.state = {
      reviewer: reviewer,
      reviews: reviews,
      activeProductIndex: 0,
      errors: {}, // form errors
      reviewerSubmitted: reviewerSubmitted,
    }
    this.formRefs = {}
  }

  defaultReview = reviewer => {
    const { userId } = this.props.match.params
    return {
      userName: reviewer.name,
      userEmail: reviewer.email,
      hostId: userId,
      images: [],
      images_attributes: [],
    }
  }

  componentDidMount() {
    const { getUser } = this.props
    const { userId } = this.props.match.params
    getUser(userId)
    this.props.analytics.reviews.visitPage()
  }

  getLocalData = userId => {
    const id = userId ? userId : this.props.user.id
    return {
      reviews: {},
      reviewerSubmitted: false,
      reviewer: JSON.parse(localStorage.getItem(REVIEWER_KEY)) || {},
      ...(JSON.parse(localStorage.getItem(REVIEWS_KEY(id))) || {}),
    }
  }

  setLocalData = data => {
    const { user } = this.props
    localStorage.setItem(REVIEWS_KEY(user.id), JSON.stringify(data))
    const reviewerData = data.reviewer
    if (Object.keys(reviewerData).length > 0) {
      localStorage.setItem(REVIEWER_KEY, JSON.stringify(reviewerData))
    }
  }

  saveData = ({ reviews, reviewer, reviewerSubmitted }) => {
    const data = this.getLocalData()
    if (reviews) data.reviews = reviews
    if (reviewer) data.reviewer = reviewer
    if (reviewerSubmitted) data.reviewerSubmitted = reviewerSubmitted
    this.setLocalData(data)
  }

  handleNextStep = () => {
    const { user, analytics } = this.props
    const { activeProductIndex } = this.state
    const product = user.receivedProducts[activeProductIndex]
    const form = this.formRefs[product.id]
    const { review } = form.state
    if (review.rating || review.comment) {
      if (!form.saveReview(review)) {
        return
      }
    } else {
      const reviews = { ...this.state.reviews, [product.id]: 'skipped' }
      this.setState(
        {
          reviews,
          activeProductIndex: activeProductIndex + 1,
        },
        () => {
          this.saveData({ reviews })
        }
      )
    }
    analytics.reviews.clickNext({ product: product.title })
  }

  createReviewCb = res => {
    const { activeProductIndex } = this.state
    const reviews = { ...this.state.reviews, [res.attributes.productId]: { ...res.attributes } }

    this.setState(
      {
        reviews,
        activeProductIndex: activeProductIndex + 1,
      },
      () => {
        this.saveData({ reviews })
      }
    )
  }

  handlePreviousStep = () => {
    const { user, analytics } = this.props
    let { activeProductIndex, reviewer, reviews } = this.state

    const product = user.receivedProducts[activeProductIndex]
    analytics.reviews.clickPrevious({ product: product.title })

    const { review } = this.formRefs[product.id].state
    const previousProduct = user.receivedProducts[activeProductIndex - 1]
    if (review.rating && review.comment) {
      reviews = { ...this.state.reviews, [product.id]: review }
    }
    this.setState(
      {
        reviews,
        activeProductIndex: activeProductIndex - 1,
        review: reviews[previousProduct.id] || this.defaultReview(reviewer),
      },
      () => {
        this.saveData({ reviews })
      }
    )
  }

  handleSwipe = activeProductIndex => {
    this.setState({ activeProductIndex })
  }

  formatNewReviews = reviews => {
    const result = {}
    Object.values(reviews).forEach(review => {
      result[review.productId] = review
    })
    return result
  }

  submitUserDetails = e => {
    e.preventDefault()
    const { setReviewsUser } = this.props
    const { reviewer, reviews } = this.state
    if (reviewer.name || reviewer.email) {
      const validation = validateReviewer(reviewer)
      if (validation.isValid) {
        const updateReviews = Object.values(reviews).filter(review => review !== 'skipped')
        setReviewsUser(updateReviews, reviewer).then(res => {
          const newReviews = normalize(res.data).entities.review || {}
          this.saveData({
            reviews: { ...reviews, ...this.formatNewReviews(newReviews) },
            reviewer,
            reviewerSubmitted: true,
          })
          this.setState({ reviewerSubmitted: true })
          this.props.analytics.reviews.submitUserData()
        })
      } else {
        this.setState({ errors: validation.errors })
      }
    } else {
      this.saveData({ reviewerSubmitted: true })
      this.setState({ reviewerSubmitted: true })
    }
  }

  render() {
    const { user, createReview, updateReview, analytics } = this.props

    const { reviewer, errors, activeProductIndex, reviewerSubmitted, reviews } = this.state

    if (!user) return null
    const { receivedProducts } = user
    const activeProduct = receivedProducts[activeProductIndex]
    const reviewedAll = Object.values(reviews).length >= receivedProducts.length
    if (reviewedAll && !reviewerSubmitted) {
      return (
        <UserDetails
          user={reviewer}
          handleChange={handleChange.bind(this, 'reviewer')}
          onSubmit={this.submitUserDetails}
          errors={errors}
          onVisit={analytics.reviews.visitUserForm}
        />
      )
    } else if (reviewedAll) {
      return <MyRewards user={user} reviews={reviews} />
    }

    return (
      <Fragment>
        <Container container>
          <Grid md={3}></Grid>
          <Grid md={6}>
            {receivedProducts.map((product, index) => (
              <Slide
                direction="right"
                in={activeProduct.id === product.id}
                mountOnEnter
                unmountOnExit
                appear={false}
                exit={false}
              >
                <CreateProductReview
                  ref={c => (this.formRefs[product.id] = c)}
                  key={index}
                  user={user}
                  product={product}
                  reviews={reviews}
                  reviewer={reviewer}
                  defaultReview={this.defaultReview}
                  createReview={createReview}
                  updateReview={updateReview}
                  createReviewCb={this.createReviewCb}
                  analytics={analytics}
                  onRate={() => {
                    const analyticsPayload = {
                      product: product.title,
                    }
                    if (index === 0) {
                      analytics.reviews.rateAtLeastOnce(analyticsPayload)
                    }
                    analytics.reviews.clickRating(analyticsPayload)
                  }}
                />
              </Slide>
            ))}
          </Grid>
        </Container>
        <StepWizard
          steps={receivedProducts.map(product => product.id)}
          currentStep={activeProductIndex + 1}
          previousDisabled={false}
          nextDisabled={false}
          onNext={this.handleNextStep}
          onPrevious={this.handlePreviousStep}
        />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser,
      createReview,
      updateReview,
      setReviewsUser,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps.match.params
  const user = selectUser(state, userId)
  return {
    user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(withAnalytics(PublicReviews))))
