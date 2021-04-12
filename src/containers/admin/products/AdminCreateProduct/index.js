import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createProduct } from 'actions/admin/products'
import ProductForm from 'components/admin/products/ProductForm'
import Form from 'components/layout/Form'
import { validateAdminProduct } from 'helpers/validations/product'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminCreateProduct extends Component {
  render() {
    const { createProduct, isUploading } = this.props

    return (
      <Form
        resourceName="product"
        title="Create a New Product"
        message="Successfully created product"
        validateFunction={validateAdminProduct}
        action={createProduct}
        saveText="Create"
        urlPrefix="/admin"
        submitDisabled={isUploading}
      >
        {(handleChange, product, errors) => (
          <ProductForm
            handleChange={handleChange}
            product={product}
            errors={errors}
            uploaderId={UPLOADER_ID}
          />
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createProduct,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminCreateProduct)))
