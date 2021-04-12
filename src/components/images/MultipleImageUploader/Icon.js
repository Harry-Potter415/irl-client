import React, { Component, Fragment } from 'react'
import { withAlerts } from 'hocs/withAlerts'
import { withUploader } from 'hocs/withUploader'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import SelectImages from 'components/layout/SelectImages'
import Button from '@material-ui/core/Button'
import { uploadFile } from 'helpers/cloudinary'
import { get } from 'lodash'
import { gridImage } from 'helpers/cloudinary'
import PictureIcon from 'icons/PictureIcon'

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'relative',
    top: -43,
    left: 6,
    bottom: 0,
    right: 0,
  },
  dropzone: {
    position: 'inherit',
  },
}

class MultipleImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: props.images,
      activeItems: [],
      files: [],
      file: null,
      isUploading: false,
      isUploaded: false,
      dropzoneActive: false,
    }
    this.removeImages = this.removeImages.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.imageUrls = this.imageUrls.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ images: newProps.images })
  }

  componentWillUnmount() {
    clearTimeout(this.successTimeout)
  }

  onSelect(selected) {
    this.setState({ activeItems: selected })
  }

  handleImageUpload(files) {
    const {
      folder,
      onImageUpload,
      showAlertError,
      startUpload,
      finishUpload,
      id,
      images,
    } = this.props
    clearTimeout(this.successTimeout)
    this.setState({ isUploading: true })
    startUpload(id)
    Promise.all(
      files.map(image => {
        return uploadFile(image, folder)
      })
    )
      .then(responses => {
        const responseImages = responses.map(res => {
          return {
            url: res.data.secure_url,
            name: res.data.original_filename,
          }
        })
        this.setState({
          isUploading: false,
          isUploaded: true,
        })
        this.successTimeout = setTimeout(() => this.setState({ isUploaded: false }), 2000)
        finishUpload(id)
        onImageUpload(images.concat(responseImages))
      })
      .catch(err => {
        console.error(err)
        showAlertError(get(err, 'data.message', err.toString()))
      })
  }

  removeImages() {
    const { images, activeItems } = this.state
    const { onImageUpload } = this.props
    const updatedImages = images.map(image => {
      if (activeItems.indexOf(gridImage(image.url)) < 0) {
        return image
      } else {
        return { ...image, _destroy: true }
      }
    })
    onImageUpload(updatedImages)
    this.setState({
      images: updatedImages,
    })
    this.refs.selectImages.resetActiveItems()
  }

  onDrop = async files => {
    this.setState({
      dropzoneActive: false,
    })
    await this.handleImageUpload(files)
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

  renderButtons() {
    const { activeItems } = this.state
    return (
      <Fragment>
        <Button
          color="secondary"
          variant="contained"
          disabled={activeItems.length === 0}
          onClick={this.removeImages}
        >
          Remove
        </Button>
      </Fragment>
    )
  }

  imageUrls() {
    const { images } = this.state
    return images.filter(image => !image._destroy).map(image => gridImage(image.url))
  }

  render() {
    return (
      <div>
        <Dropzone
          accept="image/*"
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          style={styles.dropzone}
          multiple
          activeStyle={styles.dropzoneActive}
          capture="camera"
        >
          <PictureIcon
            fontSize="large"
            color="disabled"
            variant="outline"
            style={styles.imageInput}
          />
        </Dropzone>

        <SelectImages
          images={this.imageUrls()}
          buttons={this.renderButtons()}
          ref="selectImages"
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}

MultipleImageUploader.propTypes = {
  images: PropTypes.array.isRequired,
  folder: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

MultipleImageUploader.defaultProps = {
  images: [],
}

export default withUploader(withAlerts(MultipleImageUploader))
