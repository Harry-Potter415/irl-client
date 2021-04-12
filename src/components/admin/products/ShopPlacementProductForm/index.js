import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import ImageUploader from 'components/images/ImageUploader'
import AdminUploader from 'components/admin/AdminUploader'
import { loadAdminUserCompanyOptions, buildUserCompanyOption } from 'helpers/react-select'
import { ORDER_TYPES } from 'lib/constants'

class ShopPlacementProductForm extends Component {
  render() {
    const { product, handleChange, errors, uploaderId } = this.props

    product.productType = ORDER_TYPES.placement

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
          label="Product Type"
          name="productType"
          value={ORDER_TYPES.placement}
          disabled
          error={errors.productType}
        />
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={buildUserCompanyOption(product.user)}
          hasValue={Boolean(product.userId)}
          label="Brand"
          name="userId"
          loadOptions={loadAdminUserCompanyOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'userId' })
          }}
          error={errors.userId}
        />
        <TextInput
          label="Minimum Order (in units)"
          name="minimumOrder"
          value={product.minimumOrder}
          handleChange={handleChange}
          error={errors.minimumOrder}
          type="number"
        />
        <TextInput
          label="Quantity Available"
          name="quantity"
          value={product.quantity}
          handleChange={handleChange}
          error={errors.quantity}
          type="number"
        />
        <TextInput
          label="Case Pack"
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

ShopPlacementProductForm.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  uploaderId: PropTypes.number.isRequired,
}

export default ShopPlacementProductForm
