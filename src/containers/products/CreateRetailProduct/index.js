import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { createRetailProduct } from 'actions/products'
import { validateAdminRetailProduct } from 'helpers/validations/product'
import Form from 'components/layout/Form'
import ReactSelect from 'components/inputs/ReactSelect'
import { loadSearchProductsOption } from 'helpers/react-select'

class CreateRetailProduct extends Component {
  constructor() {
    super()
    this.createRetailProduct = this.createRetailProduct.bind(this)
  }

  async createRetailProduct(product) {
    const { createRetailProduct, history, showAlertSuccess } = this.props
    try {
      const {
        data: { product_handle: productHandle },
      } = await createRetailProduct(product)
      showAlertSuccess('Successfully created product')
      history.push(`/shop/products/${productHandle}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { isFetching } = this.props
    return (
      <Form
        resourceName="product"
        title="Create a New Retail Product"
        message="Successfully created product"
        validateFunction={validateAdminRetailProduct}
        action={this.createRetailProduct}
        saveText="Create"
        urlPrefix="/admin"
        submitDisabled={isFetching}
      >
        {(handleChange, product, errors) => (
          <ReactSelect
            label="Wholesale Product"
            name="wholesaleId"
            loadOptions={loadSearchProductsOption()}
            handleChange={e => {
              handleChange(e, { reactSelect: true, field: 'wholesaleId' })
            }}
            error={errors.wholesaleId}
          />
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createRetailProduct,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { isFetching } = state.loaders
  return {
    isFetching,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(CreateRetailProduct))
