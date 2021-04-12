import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sync from 'react-select'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import ImageUploader from 'components/images/ImageUploader'
import AdminUploader from 'components/admin/AdminUploader'
import { loadAdminUserOptions, buildUserOption } from 'helpers/react-select'
import { PRODUCT_TYPES } from 'lib/constants'

class ShopProductForm extends Component {
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
        <ReactSelect
          onChange={this.handleChange}
          defaultValue={product.productType}
          hasValue={product.productType && product.productType.length > 0}
          label="Product Type"
          name="productType"
          options={PRODUCT_TYPES}
          SelectComponent={Sync}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'productType' })
          }}
          error={errors.productType}
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
          label="Price per Unit (in USD)"
          name="pricePerUnit"
          value={product.pricePerUnit}
          handleChange={handleChange}
          error={errors.pricePerUnit}
          type="number"
        />
        <TextInput
          label="Retail Price (in USD)"
          name="retailPrice"
          value={product.retailPrice}
          handleChange={handleChange}
          error={errors.retailPrice}
          type="number"
        />
        <TextInput
          label="Minimum Order (in USD)"
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

ShopProductForm.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  uploaderId: PropTypes.number.isRequired,
}

export default ShopProductForm
