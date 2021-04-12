import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaignReviews, approveReviews, rejectReviews } from 'actions/admin/reviews'
import { selectReviews } from 'selectors/admin/reviews'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/reviews/ReviewTableHeader'
import TableRow from 'components/admin/reviews/ReviewTableRow'
import { orderBy } from 'lodash'
import { toggleActive, selectAll, isSelected, selectedItemsAction } from 'helpers/select-items'
import SelectActions from 'components/layout/Table/SelectActions'
import pluralize from 'pluralize'
import ReviewFilters from 'components/admin/reviews/ReviewFilters'

class AdminCampaignReviews extends Component {
  constructor() {
    super()
    this.state = {
      activeItems: [],
      selectAll: false,
      filters: {
        nameOrEmail: null,
        reviewCampaignId: null,
        comment: null,
        ratingGt: null,
      },
    }
    this.getItems = this.getItems.bind(this)
    this.isSelected = isSelected.bind(this)
    this.selectAll = selectAll.bind(this, null)
    this.toggleActive = toggleActive.bind(this)
    this.selectedItemsAction = selectedItemsAction.bind(this)
    this.changeReviewFilters = this.changeReviewFilters.bind(this)
    this.timeout = null
  }

  componentDidMount() {
    const { filters } = this.state
    const { campaignId } = this.props.match.params
    this.props.getCampaignReviews(campaignId, filters, 1)
  }

  getItems() {
    const { reviews } = this.props
    return reviews.map(review => review.id)
  }

  changeReviewFilters(filter, value) {
    const { filters } = this.state
    const { page, getCampaignReviews } = this.props
    const { campaignId } = this.props.match.params
    const get = () => getCampaignReviews(campaignId, filters, page)
    clearTimeout(this.timeout)
    filters[filter] = value
    this.setState(
      {
        filters: filters,
      },
      () => {
        this.timeout = setTimeout(get, 200)
      }
    )
  }

  render() {
    let {
      reviews,
      history,
      total,
      page,
      getCampaignReviews,
      approveReviews,
      rejectReviews,
    } = this.props
    const { activeItems, selectAll, filters } = this.state
    const { campaignId } = this.props.match.params
    return (
      <Fragment>
        <ReviewFilters
          filters={filters}
          changeFilter={this.changeReviewFilters}
          campaignFilter={false}
          productFilter={false}
        />
        <AdminIndex
          resourceName="review"
          history={history}
          canCreateResource={false}
          actions={
            <SelectActions
              approveLabel={`Approve ${activeItems.length} ${pluralize(
                'review',
                activeItems.length
              )}`}
              rejectLabel={`Reject ${activeItems.length} ${pluralize(
                'review',
                activeItems.length
              )}`}
              onSelectAll={this.selectAll}
              activeItems={activeItems}
              selectAll={selectAll}
              approve={() => this.selectedItemsAction(approveReviews)}
              reject={() => this.selectedItemsAction(rejectReviews)}
            />
          }
        >
          {reviews && (
            <Table
              resources={orderBy(reviews, 'createdAt', 'desc')}
              resourceName="review"
              HeaderComponent={TableHeader}
              ItemComponent={TableRow}
              total={total}
              page={page}
              action={getCampaignReviews.bind(null, campaignId, filters)}
              isSelected={this.isSelected}
              toggleActive={this.toggleActive}
            />
          )}
        </AdminIndex>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaignReviews,
      approveReviews,
      rejectReviews,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { reviews, total, page } = selectReviews(state)
  return {
    reviews,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminCampaignReviews)))
