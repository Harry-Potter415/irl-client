import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getMessages } from 'actions/admin/messages'
import { selectMessages } from 'selectors/admin/messages'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/textMessages/MessageTableHeader'
import TableRow from 'components/admin/textMessages/MessageTableRow'
import MessageFilters from 'components/admin/textMessages/MessageFilters'

class AdminMessages extends Component {
  constructor() {
    super()
    this.state = {
      filters: {
        id: null,
        phone_number: null,
        message: null,
      },
    }
  }

  componentDidMount() {
    const { filters } = this.state
    this.props.getMessages(filters)
  }

  changeMessageFilters = (filter, value) => {
    const { filters } = this.state
    const { getMessages } = this.props
    const get = () => getMessages(filters, 1)
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
    let { messages, history, total, page, getMessages } = this.props
    const { filters } = this.state
    return (
      <Fragment>
        <MessageFilters filters={filters} changeFilter={this.changeMessageFilters} />
        <AdminIndex resourceName="message" history={history}>
          {messages && (
            <Table
              resources={messages}
              resourceName="message"
              HeaderComponent={TableHeader}
              ItemComponent={TableRow}
              total={total}
              page={page}
              action={getMessages.bind(null, filters)}
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
      getMessages,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { messages, total, page } = selectMessages(state)
  return {
    messages,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminMessages)))
