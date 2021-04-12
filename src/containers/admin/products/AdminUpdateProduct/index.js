import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getProduct, updateProduct } from 'actions/admin/products'
import Form from 'components/layout/Form'
import ProductForm from 'components/admin/products/ProductForm'
import { validateAdminProduct } from 'helpers/validations/product'
import { isLoaded } from 'helpers/components'
import { selectProduct } from 'selectors/admin/products'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminUpdateProduct extends Component {
  componentDidMount() {
    const { getProduct } = this.props
    const { id } = this.props.match.params
    getProduct(id)
  }

  render() {
    const { product, updateProduct, isUploading } = this.props
    if (!isLoaded(product, ['user'])) return null

    return (
      <Form
        initialValues={product}
        resourceName="product"
        title="Edit Product"
        message="Successfully updated product"
        validateFunction={validateAdminProduct}
        action={updateProduct}
        saveText="Update"
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
      getProduct,
      updateProduct,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const product = selectProduct(state, id)
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  return {
    product,
    isUploading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminUpdateProduct)))
