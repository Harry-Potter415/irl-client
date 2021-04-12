import React, { Component } from 'react'
import TextInput from 'components/inputs/TextInput'
import ImageCarousel from 'components/layout/ImageCarousel'
import { gridImage } from 'helpers/cloudinary'
import { Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import Rating from 'components/inputs/Rating'
import { detailsImage } from 'helpers/cloudinary'
import { handleChange } from 'helpers/components'
import { get } from 'lodash'
import { validateReview } from 'helpers/validations/review'
import MultipleImageUploaderIcon from 'components/images/MultipleImageUploader/Icon'

const Review = styled.div`
  margin: auto;
`
const FormField = styled.div`
  margin-top: 0.5rem;
`
const Title = styled(Typography)`
  && {
    margin: 1rem 0;
  }
`
const Description = styled(Typography)`
  white-space: pre-wrap;
`
const Company = styled(Typography)`
  && {
    margin-top: 1rem;
  }
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Image = styled.img`
  display: block;
  height: calc(100%);
  width: 100%;
`
const Comment = styled.div`
  textarea {
    min-height: 4rem;
  }
  // when an error appears, it changes the height of the element and the upload icon moves down
  // breaking the look (it's tied to the bottom). Positioning the error absolute makes the total
  // height independent of it
  .MuiTypography-colorError {
    position: absolute;
    bottom: -21px;
  }
`

class CreateProductReview extends Component {
  constructor(props) {
    super(props)
    const { reviewer, product, defaultReview, reviews } = props
    let review = reviews[product.id]
    if (!review || review === 'skipped') {
      review = defaultReview(reviewer)
    }
    this.state = {
      review,
      errors: {},
    }
    this.handleChange = handleChange.bind(this, 'review')
    this.imageUrls = this.imageUrls.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onImageUpload = this.onImageUpload.bind(this)
  }

  onImageUpload(e) {
    this.handleChange(e, { imageUploader: true, field: 'images_attributes' })
  }

  removeImage(imageToRemove) {
    const { review } = this.state
    const updatedImages = review.images_attributes.map(image => {
      if (gridImage(image.url) === imageToRemove) {
        return { ...image, _destroy: true }
      } else {
        return image
      }
    })
    this.onImageUpload(updatedImages)
    const updatedReview = { ...review, images: updatedImages }
    this.setState({
      review: updatedReview,
    })
  }

  imageUrls() {
    const { images_attributes } = this.state.review
    return (
      images_attributes &&
      images_attributes.filter(image => !image._destroy).map(image => gridImage(image.url))
    )
  }

  /**
   *  @returns {boolean} "is successful?"
   */
  saveReview = (review, e) => {
    e && e.preventDefault()
    const { createReview, updateReview, product, createReviewCb } = this.props
    const validate = validateReview(review)
    const action = review.id ? updateReview : createReview
    if (validate.isValid) {
      action(product, review).then(res => {
        const data = get(res, 'data.data', {})
        this.setState({ review: data.attributes })
        createReviewCb(data)
      })
      return true
    } else {
      this.setState({ errors: validate.errors })
      return false
    }
  }

  render() {
    const { user, product, onRate } = this.props
    const { review, errors } = this.state

    return (
      <Review>
        <ImageContainer>
          <Image src={detailsImage(product.imageUrl)} />
        </ImageContainer>
        <Grid container>
          <Grid md={3}></Grid>
          <Grid md={6} xs={12}>
            <Company component="div" variant="caption">
              {user.company}
            </Company>
            <Title variant="h5">{product.title}</Title>
            <Description variant="body1">{product.description}</Description>
            <form>
              <FormField>
                <Rating
                  onChange={(...args) => {
                    onRate()
                    return this.handleChange(...args)
                  }}
                  value={review.rating}
                  name="rating"
                />
                <Typography color="error" variant="caption" gutterBottom>
                  {errors.rating}
                </Typography>
              </FormField>
              {review.rating && (
                <FormField>
                  <Comment>
                    <TextInput
                      label="What did you think about this product?"
                      name="comment"
                      value={review.comment}
                      handleChange={this.handleChange}
                      multiline
                      error={errors.comment}
                    />
                  </Comment>
                  <MultipleImageUploaderIcon
                    folder="products"
                    id={product.id}
                    onImageUpload={this.onImageUpload}
                  />
                  <ImageCarousel images={this.imageUrls()} removeImage={this.removeImage} />
                </FormField>
              )}
              <FormField></FormField>
            </form>
          </Grid>
        </Grid>
      </Review>
    )
  }
}

export default CreateProductReview
