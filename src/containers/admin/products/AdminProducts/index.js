import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getProducts } from 'actions/admin/products'
import { selectProducts } from 'selectors/admin/products'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/products/ProductTableHeader'
import TableRow from 'components/admin/products/ProductTableRow'
import ProductFilters from 'components/admin/products/ProductFilters'

class AdminProducts extends Component {
  constructor() {
    super()
    this.state = {
      filters: {
        id: null,
        title: null,
        brand: null,
      },
    }
  }

  componentDidMount() {
    const { filters } = this.state
    this.props.getProducts(filters)
  }

  changeProductFilters = (filter, value) => {
    const { filters } = this.state
    const { getProducts } = this.props
    const get = () => getProducts(filters, 1)
    clearTimeout(this.timeout)
    filters[filter] = value
    this.setState(
      {
        filters: filters,
      },
      () => {
        this.timeout = setTimeout(get, 500)
      }
    )
  }

  render() {
    let { products, history, total, page, getProducts } = this.props
    const { filters } = this.state
    return (
      <Fragment>
        <ProductFilters filters={filters} changeFilter={this.changeProductFilters} />
        <AdminIndex resourceName="product" history={history}>
          {products && (
            <Table
              resources={products}
              resourceName="product"
              HeaderComponent={TableHeader}
              ItemComponent={TableRow}
              total={total}
              page={page}
              action={getProducts.bind(null, filters)}
            />
          )}
        </AdminIndex>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProducts,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { products, total, page } = selectProducts(state)
  return {
    products,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminProducts)))
