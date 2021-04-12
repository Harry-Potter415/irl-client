import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getUsers, approveUsers, rejectUsers } from 'actions/admin/users'
import { selectUsers } from 'selectors/admin/users'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/users/UserTableHeader'
import TableRow from 'components/admin/users/UserTableRow'
import SelectActions from 'components/layout/Table/SelectActions'
import { toggleActive, selectAll, isSelected, selectedItemsAction } from 'helpers/select-items'
import pluralize from 'pluralize'
import UserFilters from 'components/admin/users/UserFilters'

class AdminUsers extends Component {
  constructor() {
    super()
    this.state = {
      activeItems: [],
      selectAll: false,
      filters: {
        company: null,
        userType: null,
        name: null,
        email: null,
        rooms: [0, null],
        city: null,
        audience: null,
        ageGroup: null,
      },
    }
    this.getItems = this.getItems.bind(this)
    this.isSelected = isSelected.bind(this)
    this.selectAll = selectAll.bind(this, null)
    this.toggleActive = toggleActive.bind(this)
    this.selectedItemsAction = selectedItemsAction.bind(this)
  }

  componentDidMount() {
    const { filters } = this.state
    this.props.getUsers(filters)
  }

  getItems() {
    const { users } = this.props
    return users.map(user => user.id)
  }

  changeFilters = (filter, value) => {
    const { filters } = this.state
    const { getUsers } = this.props
    const get = () => getUsers(filters, 1)
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
    let { users, history, total, page, getUsers, approveUsers, rejectUsers } = this.props
    const { activeItems, selectAll, filters } = this.state
    return (
      <Fragment>
        <UserFilters filters={filters} changeFilter={this.changeFilters} />
        <AdminIndex
          resourceName="user"
          canCreateResource={false}
          history={history}
          actions={
            <SelectActions
              approveLabel={`Approve ${activeItems.length} ${pluralize(
                'user',
                activeItems.length
              )}`}
              rejectLabel={`Reject ${activeItems.length} ${pluralize('user', activeItems.length)}`}
              onSelectAll={this.selectAll}
              activeItems={activeItems}
              selectAll={selectAll}
              approve={() => this.selectedItemsAction(approveUsers)}
              reject={() => this.selectedItemsAction(rejectUsers)}
            />
          }
        >
          {users && (
            <Table
              resources={users}
              resourceName="user"
              HeaderComponent={TableHeader}
              ItemComponent={TableRow}
              total={total}
              page={page}
              action={getUsers.bind(null, filters)}
              approve={approveUsers}
              reject={rejectUsers}
              isSelected={this.isSelected}
              toggleActive={this.toggleActive}
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
      getUsers,
      approveUsers,
      rejectUsers,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { users, page, total } = selectUsers(state)
  return {
    users,
    page,
    total,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminUsers)))
