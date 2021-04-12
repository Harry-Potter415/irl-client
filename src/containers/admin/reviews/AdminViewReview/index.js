import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getReview } from 'actions/admin/reviews'
import { selectReview } from 'selectors/admin/reviews'

import Review from 'components/admin/reviews/Review'

class AdminViewReview extends Component {
  componentDidMount() {
    const { getReview } = this.props
    const { id } = this.props.match.params
    getReview(id)
  }

  render() {
    const { review } = this.props
    return <Fragment>{review && <Review review={review} />}</Fragment>
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getReview,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const review = selectReview(state, id)
  return {
    review,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminViewReview)))
