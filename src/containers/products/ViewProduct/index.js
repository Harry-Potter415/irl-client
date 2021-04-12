import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getProduct, deleteProduct } from 'actions/products'
import { selectProduct } from 'selectors/products'
import Product from 'components/products/Product'

class ViewProduct extends Component {
  componentDidMount() {
    const { getProduct } = this.props
    const { id } = this.props.match.params
    getProduct(id)
  }

  deleteProduct = () => {
    const { product, deleteProduct, history, showAlertSuccess } = this.props
    deleteProduct(product.id).then(() => {
      history.push('/products')
      showAlertSuccess('Product deleted successfully')
    })
  }

  render() {
    const { product } = this.props
    return (
      <Fragment>
        {product && <Product product={product} deleteProduct={this.deleteProduct} />}
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProduct,
      deleteProduct,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const product = selectProduct(state, id)
  return {
    product,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(ViewProduct)))
