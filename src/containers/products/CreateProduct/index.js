import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { createProductPackage } from 'actions/product_packages'
import { validateWholesaleAndRetailProduct } from 'helpers/validations/product'
import Form from 'components/layout/Form'
import ProductForm from 'components/products/ProductForm'
import { selectIsUploading } from 'selectors/uploader'
import uniqueId from 'lodash/uniqueId'

const UPLOADER_ID = parseInt(uniqueId())

class CreateProduct extends Component {
  constructor() {
    super()
    this.createProductPackage = this.createProductPackage.bind(this)
  }

  async createProductPackage(product) {
    const { createProductPackage, history, showAlertSuccess } = this.props
    try {
      const {
        data: { product_handle: productHandle },
      } = await createProductPackage(product)
      showAlertSuccess('Successfully created product')
      history.push(`/shop/products/${productHandle}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { isUploading, isFetching } = this.props

    return (
      <Form
        title=""
        resourceName="product"
        message="Successfully created product"
        validateFunction={validateWholesaleAndRetailProduct}
        action={this.createProductPackage}
        saveText="Submit Product"
        submitDisabled={isUploading || isFetching}
        justify="flex-start"
        md={10}
        width="50%"
        marginLeft="25%"
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
      createProductPackage,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const isUploading = selectIsUploading(state, UPLOADER_ID)
  const { isFetching } = state.loaders
  return {
    isUploading,
    isFetching,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(CreateProduct)))
