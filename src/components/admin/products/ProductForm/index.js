import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadAdminUserOptions, buildUserOption } from 'helpers/react-select'
import ImageUploader from 'components/images/ImageUploader'
import AdminUploader from 'components/admin/AdminUploader'

class ProductForm extends Component {
  render() {
    let { product, handleChange, errors, uploaderId } = this.props

    return (
      <div>
        <TextInput
          label="Title"
          name="title"
          value={product.title}
          handleChange={handleChange}
          error={errors.title}
        />
        <TextInput
          label="Description"
          name="description"
          value={product.description}
          multiline
          handleChange={handleChange}
          error={errors.description}
        />
        <TextInput
          label="Url"
          name="url"
          value={product.url}
          handleChange={handleChange}
          error={errors.url}
        />
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={buildUserOption(product.user)}
          hasValue={Boolean(product.userId)}
          label="User"
          name="userId"
          loadOptions={loadAdminUserOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'userId' })
          }}
          error={errors.userId}
        />
        <TextInput
          label="Promo Title"
          name="promoTitle"
          value={product.promoTitle}
          handleChange={handleChange}
          error={errors.promoTitle}
        />
        <TextInput
          label="Promo Code"
          name="promoCode"
          value={product.promoCode}
          handleChange={handleChange}
          error={errors.promoCode}
        />
        <TextInput
          label="Promo Description"
          name="promoDescription"
          value={product.promoDescription}
          multiline
          handleChange={handleChange}
          error={errors.promoDescription}
        />
        <TextInput
          label="Units per Carton"
          name="unitsPerCarton"
          value={product.unitsPerCarton}
          handleChange={handleChange}
          error={errors.unitsPerCarton}
          type="number"
        />
        <AdminUploader label="Photo">
          <ImageUploader
            imageUrl={product.imageUrl}
            folder="products"
            id={uploaderId}
            onImageUpload={e => {
              handleChange(e, { imageUploader: true, field: 'imageUrl' })
            }}
          />
        </AdminUploader>
      </div>
    )
  }
}

ProductForm.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  uploaderId: PropTypes.number.isRequired,
}

export default ProductForm
