import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getAddresses } from 'actions/admin/addresses'
import { selectAddresses } from 'selectors/admin/addresses'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/addresses/AddressTableHeader'
import TableRow from 'components/admin/addresses/AddressTableRow'

class AdminAddresses extends Component {
  componentDidMount() {
    this.props.getAddresses()
  }

  render() {
    let { addresses, history, total, page, getAddresses } = this.props
    return (
      <AdminIndex resourceName="address" history={history}>
        {addresses && (
          <Table
            resources={addresses}
            resourceName="address"
            HeaderComponent={TableHeader}
            ItemComponent={TableRow}
            total={total}
            page={page}
            action={getAddresses}
            pagination={false}
          />
        )}
      </AdminIndex>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAddresses,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { addresses, total, page } = selectAddresses(state)
  return {
    addresses,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminAddresses)))
