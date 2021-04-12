import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaign, uploadCampaignImages } from 'actions/campaigns'
import { selectCampaign } from 'selectors/campaigns'
import { handleChange, isLoaded } from 'helpers/components'
import MultipleImageUploader from 'components/images/MultipleImageUploader'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { USER_CAMPAIGN_STATUSES } from 'lib/constants'

const UPLOADER_ID = uniqueId()

const Title = styled(Typography)`
  margin-top: 30px !important;
`
const CampaignImages = styled.div`
  margin-top: 30px;
`
const SaveButton = styled(Button)`
  margin-top: 30px !important;
`

class UploadCampaignImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCampaign: null,
    }
    this.handleChange = handleChange.bind(this, 'userCampaign')
    this.saveImages = this.saveImages.bind(this)
  }

  componentDidMount() {
    const { getCampaign } = this.props
    const { id } = this.props.match.params
    getCampaign(id)
    if (this.props.campaign) {
      this.setState({ userCampaign: this.props.campaign.currentUserCampaign })
    }
  }

  componentWillReceiveProps(newProps) {
    const { campaign, getCampaign } = this.props
    const { id } = this.props.match.params
    if (!campaign) getCampaign(id)
    if (newProps.campaign && !this.state.userCampaign) {
      this.setState({ userCampaign: newProps.campaign.currentUserCampaign })
    }
  }

  saveImages() {
    const { userCampaign } = this.state
    const { uploadCampaignImages, history, campaign } = this.props
    userCampaign.images = userCampaign.images.filter(image => !image._destroy)
    uploadCampaignImages(userCampaign).then(res => {
      history.push(`/placements/${campaign.id}`)
    })
  }

  render() {
    const { userCampaign } = this.state
    const { isUploading } = this.props
    if (!isLoaded(userCampaign)) return null
    if (userCampaign.status !== USER_CAMPAIGN_STATUSES.delivered) {
      return <Title variant="h3">Photos uploading is disabled in this state</Title>
    }
    return (
      <Fragment>
        <Title variant="h3">Upload Product Photos</Title>
        <CampaignImages>
          <MultipleImageUploader
            images={userCampaign.images}
            folder="properties"
            id={UPLOADER_ID}
            onImageUpload={e => {
              this.handleChange(e, { imageUploader: true, field: 'images' })
            }}
          />
        </CampaignImages>
        <SaveButton
          variant="contained"
          color="primary"
          onClick={this.saveImages}
          disabled={isUploading}
        >
          Save
        </SaveButton>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaign,
      uploadCampaignImages,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const campaign = selectCampaign(state, id)
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    campaign,
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(UploadCampaignImages)))
