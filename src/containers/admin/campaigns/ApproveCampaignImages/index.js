import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, approveCampaignImages, rejectCampaignImages } from 'actions/admin/campaigns'
import { selectCampaign } from 'selectors/admin/campaigns'
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

class ApproveCampaignImages extends Component {
  constructor(props) {
    super()
    this.state = {
      activeItems: [],
      filter: 'pending',
      images: this.filterImages(props.campaign, FILTERS.pending),
    }
    this.renderButtons = this.renderButtons.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.approveAction = this.approveAction.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }

  componentDidMount() {
    const { getCampaign } = this.props
    const { id } = this.props.match.params
    getCampaign(id)
  }

  componentWillReceiveProps(newProps) {
    const { filter } = this.state
    const { campaign } = newProps
    if (campaign && campaign.images) {
      this.setState({
        images: this.filterImages(campaign, filter),
      })
    }
  }

  approveAction(action) {
    const { activeItems } = this.state
    const { campaign } = this.props
    const images = campaign.images.filter(image => activeItems.indexOf(gridImage(image.url)) >= 0)
    action(images.map(image => image.id))
    this.refs.selectImages.resetActiveItems()
  }

  renderButtons() {
    const { activeItems } = this.state
    const { approveCampaignImages, rejectCampaignImages } = this.props
    return (
      <Fragment>
        <Button
          color="secondary"
          variant="contained"
          disabled={activeItems.length === 0}
          onClick={() => this.approveAction(rejectCampaignImages)}
        >
          Reject Photos
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={activeItems.length === 0}
          onClick={() => this.approveAction(approveCampaignImages)}
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
    const { campaign } = this.props
    const filter = e.target.value
    this.setState({
      filter,
      images: this.filterImages(campaign, filter),
    })
  }

  filterImages(campaign, filter) {
    if (!campaign || !campaign.images) return []
    return campaign.images.filter(image => image.status === filter)
  }

  render() {
    const { campaign } = this.props
    const { images, filter } = this.state
    if (!campaign) return null

    return (
      <div>
        {campaign.images && campaign.images.length > 0 ? (
          <Fragment>
            <SelectFilter>
              <SelectInput options={FILTERS} value={filter} handleChange={this.changeFilter} />
            </SelectFilter>
            {images && images.length > 0 ? (
              <SelectImages
                images={images.map(image => gridImage(image.url))}
                size={240}
                buttons={this.renderButtons()}
                ref="selectImages"
                onSelect={this.onSelect}
              />
            ) : (
              <Placeholder
                icon={<ImageIcon />}
                title={`No placement photos matched the filter "${filter}"`}
              />
            )}
          </Fragment>
        ) : (
          <Placeholder
            icon={<ImageIcon />}
            title="No photos for this placement"
            description="Placement photos will appear here for you to approve"
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaign,
      approveCampaignImages,
      rejectCampaignImages,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const campaign = selectCampaign(state, id)
  return {
    campaign,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(ApproveCampaignImages)))
