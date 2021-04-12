import React, { Component, Fragment } from 'react'
import { withAlerts } from 'hocs/withAlerts'
import { withUploader } from 'hocs/withUploader'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { uploadFile } from 'helpers/cloudinary'
import styled from 'styled-components'
import { get } from 'lodash'
import { uploaderImage } from 'helpers/cloudinary'
import UploaderContent from 'components/images/UploaderContent'
import DeleteImageButton from 'components/images/DeleteImageButton'

const styles = {
  dropzone: {
    fontFamily: 'Roboto',
    height: '260px',
    width: '100%',
    margin: '0 auto',
  },
}
const Container = styled.div`
  width: 100%;
`
const ImageContainer = styled.div`
  color: ${props => props.theme.palette.grey[500]};
`
const Image = styled.img`
  padding: 2px;
  background-color: #fff;
  margin: 0 0 10px 0;
  max-width: 100%;
  height: auto;
`

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      file: null,
      isUploading: false,
      isUploaded: false,
      dropzoneActive: false,
    }
    this.handleImageUpdate = this.handleImageUpdate.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.successTimeout)
  }

  handleImageUpdate(images) {
    const { folder, onImageUpload, showAlertError } = this.props
    return uploadFile(images[0], folder)
      .then(res => {
        onImageUpload(res.data.secure_url)
      })
      .catch(err => {
        console.error(err)
        showAlertError(get(err, 'data.message', err.toString()))
      })
  }

  removeImage() {
    const { onImageUpload } = this.props
    onImageUpload(null)
  }

  onDrop = async files => {
    const { startUpload, finishUpload, id } = this.props
    clearTimeout(this.successTimeout)
    this.setState({
      isUploading: true,
      isUploaded: false,
      dropzoneActive: false,
    })
    startUpload(id)
    await this.handleImageUpdate(files)
    this.setState({
      files: [],
      file: null,
      isUploading: false,
      isUploaded: true,
    })
    this.successTimeout = setTimeout(() => this.setState({ isUploaded: false }), 2000)
    finishUpload(id)
  }

  onDragEnter = files => {
    this.setState({
      files: files,
      dropzoneActive: true,
    })
  }

  onDragLeave = files => {
    this.setState({
      files: files,
      dropzoneActive: false,
    })
  }

  render() {
    const { imageUrl, detailsText } = this.props
    const { dropzoneActive, isUploading, isUploaded } = this.state

    return (
      <Container>
        {imageUrl && !isUploaded ? (
          <ImageContainer>
            <DeleteImageButton onClick={this.removeImage} />
            <Image src={uploaderImage(imageUrl)} />
          </ImageContainer>
        ) : (
          <Dropzone
            accept="image/*"
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            style={styles.dropzone}
            multiple={false}
            activeStyle={styles.dropzoneActive}
          >
            {!isUploaded && !isUploading && !dropzoneActive ? (
              <Fragment>
                <UploaderContent
                  state="default"
                  text="Drag and drop here or"
                  detailsText={detailsText}
                  action="Upload"
                />
              </Fragment>
            ) : null}

            {isUploaded ? (
              <UploaderContent
                state="uploaded"
                text="Photo successfully uploaded"
                detailsText={detailsText}
              />
            ) : null}

            {!isUploaded && !isUploading && dropzoneActive ? (
              <UploaderContent
                state="active"
                text="Drag and drop here or"
                detailsText={detailsText}
                action="Upload"
              />
            ) : null}

            {!isUploaded && isUploading ? (
              <UploaderContent
                state="uploading"
                text="Photo is uploading"
                detailsText={detailsText}
              />
            ) : null}
          </Dropzone>
        )}
      </Container>
    )
  }
}

ImageUploader.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default withUploader(withAlerts(ImageUploader))
