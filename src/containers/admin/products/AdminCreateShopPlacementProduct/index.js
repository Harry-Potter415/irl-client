import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createShopProduct } from 'actions/admin/products'
import ShopPlacementProductForm from 'components/admin/products/ShopPlacementProductForm'
import Form from 'components/layout/Form'
import { validateAdminShopPlacementProduct } from 'helpers/validations/product'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = uniqueId()

class AdminCreateShopPlacementProduct extends Component {
  render() {
    const { createShopProduct, isUploading } = this.props

    return (
      <Form
        resourceName="product"
        title="Create a New Shop Placement Product"
        message="Successfully created shop placement product"
        validateFunction={validateAdminShopPlacementProduct}
        action={createShopProduct}
        saveText="Create"
        urlPrefix="/admin"
        submitDisabled={isUploading}
      >
        {(handleChange, product, errors) => (
          <ShopPlacementProductForm
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
)(withRouter(withAlerts(AdminCreateShopPlacementProduct)))
