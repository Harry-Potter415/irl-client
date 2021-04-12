import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from 'components/layout/Table'
import ReviewTableHeader from './ReviewTableHeader'
import ReviewTableRow from './ReviewTableRow'
import { selectReviews } from 'selectors/reviews'
import { getReviews } from 'actions/reviews'

const ReviewTable = ({ rows, getReviews, showOnlyFirstPage }) => {
  useEffect(() => {
    getReviews()
  }, [getReviews])
  const perPage = 5

  if (showOnlyFirstPage) rows = rows.slice(0, perPage)

  return (
    <Table
      resources={rows}
      resourceName="review"
      HeaderComponent={ReviewTableHeader}
      ItemComponent={ReviewTableRow}
      pagination={false}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getReviews,
    },
    dispatch
  )
}

const mapStateToProps = state => {
  const { reviews } = selectReviews(state)
  return {
    rows: reviews,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewTable)
