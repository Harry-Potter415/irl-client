import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createShopProduct } from 'actions/admin/products'
import ShopProductForm from 'components/admin/products/ShopProductForm'
import Form from 'components/layout/Form'
import { validateAdminShopProduct } from 'helpers/validations/product'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminCreateShopProduct extends Component {
  render() {
    const { createShopProduct, isUploading } = this.props

    return (
      <Form
        resourceName="product"
        title="Create a New Shop Product"
        message="Successfully created shop product"
        validateFunction={validateAdminShopProduct}
        action={createShopProduct}
        saveText="Create"
        urlPrefix="/admin"
        submitDisabled={isUploading}
      >
        {(handleChange, product, errors) => (
          <ShopProductForm
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
      createShopProduct,
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
)(withRouter(withAlerts(AdminCreateShopProduct)))
