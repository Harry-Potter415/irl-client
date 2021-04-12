import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getReview, approveImages, rejectImages } from 'actions/admin/reviews'
import { selectReview } from 'selectors/admin/reviews'
import SelectImages from 'components/layout/SelectImages'
import Button from '@material-ui/core/Button'
import SelectInput from 'components/inputs/SelectInput'
import styled from 'styled-components'
import Placeholder from 'components/alerts/Placeholder'
import { gridImage } from 'helpers/cloudinary'
import ImageIcon from '@material-ui/icons/Image'

const FILTERS = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

const SelectFilter = styled.div`
  float: right;
`

class ApproveReviewImages extends Component {
  constructor(props) {
    super()
    this.state = {
      activeItems: [],
      filter: 'pending',
      filteredImages: [],
    }
    this.renderButtons = this.renderButtons.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.approveAction = this.approveAction.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }

  componentDidMount() {
    const {
      getReview,
      match: {
        params: { id },
      },
    } = this.props
    getReview(id)
  }

  componentWillReceiveProps(newProps) {
    const { filter } = this.state
    const { review } = newProps
    if (review) {
      this.setState({
        filteredImages: this.filterImages(filter),
      })
    }
  }

  approveAction(action) {
    const { activeItems } = this.state
    const {
      review: { images },
    } = this.props
    const filteredImages = images.filter(image => activeItems.indexOf(gridImage(image.url)) >= 0)
    action(filteredImages.map(image => image.id))
    this.refs.selectImages.resetActiveItems()
  }

  renderButtons() {
    const { activeItems } = this.state
    const { approveImages, rejectImages } = this.props
    return (
      <Fragment>
        <Button
          color="secondary"
          variant="contained"
          disabled={activeItems.length === 0}
          onClick={() => this.approveAction(rejectImages)}
        >
          Reject Photos
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={activeItems.length === 0}
          onClick={() => this.approveAction(approveImages)}
        >
          Approve Photos
        </Button>
      </Fragment>
    )
  }

  onSelect(selected) {
    this.setState({ activeItems: selected })
  }

  changeFilter(e) {
    const filter = e.target.value
    this.setState({
      filter,
      filteredImages: this.filterImages(filter),
    })
  }

  filterImages(filter) {
    const { review } = this.props
    if (!review) return []
    const {
      review: { images },
    } = this.props
    if (!images) return []
    return images.filter(image => image.status === filter)
  }

  render() {
    const { review } = this.props
    const { filter, filteredImages } = this.state
    if (!review) return null

    const {
      review: { images },
    } = this.props

    return (
      <div>
        {images && images.length > 0 ? (
          <Fragment>
            <SelectFilter>
              <SelectInput options={FILTERS} value={filter} handleChange={this.changeFilter} />
            </SelectFilter>
            {filteredImages && filteredImages.length > 0 ? (
              <SelectImages
                images={filteredImages.map(image => gridImage(image.url))}
                size={240}
                buttons={this.renderButtons()}
                ref="selectImages"
                onSelect={this.onSelect}
              />
            ) : (
              <Placeholder
                icon={<ImageIcon />}
                title={`No review photos matched the filter "${filter}"`}
              />
            )}
          </Fragment>
        ) : (
          <Placeholder
            icon={<ImageIcon />}
            title="No reviews with photos for this placement"
            description="Placement review photos will appear here for you to approve"
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getReview,
      approveImages,
      rejectImages,
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
)(withRouter(withAlerts(ApproveReviewImages)))
