import React from 'react'
import { connect } from 'react-redux'
import Table from 'components/layout/Table'
import ProductTableHeader from './ProductTableHeader'
import ProductTableRow from './ProductTableRow'

const ProductTable = ({ rows }) => {
  return (
    <Table
      resources={rows}
      resourceName="product"
      HeaderComponent={ProductTableHeader}
      ItemComponent={ProductTableRow}
      pagination={false}
    />
  )
}

const mapStateToProps = state => {
  return {
    rows: [
      {
        product: 'Grain Free Chips',
        revenue: '$5000',
      },
    ],
  }
}

export default connect(mapStateToProps)(ProductTable)
