import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import {
  getUserCampaigns,
  approveUserCampaigns,
  rejectUserCampaigns,
} from 'actions/admin/userCampaigns'
import { selectUserCampaigns } from 'selectors/admin/userCampaigns'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/campaigns/userCampaigns/UserCampaignTableHeader'
import TableRow from 'components/admin/campaigns/userCampaigns/UserCampaignTableRow'
import SelectActions from 'components/layout/Table/SelectActions'
import { toggleActive, selectAll, isSelected, selectedItemsAction } from 'helpers/select-items'
import pluralize from 'pluralize'
class UserCampaigns extends Component {
  constructor() {
    super()
    this.state = {
      activeItems: [],
      selectAll: false,
    }
    this.getItems = this.getItems.bind(this)
    this.isSelected = isSelected.bind(this)
    this.selectAll = selectAll.bind(this, null)
    this.toggleActive = toggleActive.bind(this)
    this.selectedItemsAction = selectedItemsAction.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUserCampaigns(id)
  }

  getItems() {
    const { userCampaigns } = this.props
    return userCampaigns.map(userCampaign => userCampaign.id)
  }

  render() {
    const {
      userCampaigns,
      total,
      page,
      getUserCampaigns,
      approveUserCampaigns,
      rejectUserCampaigns,
    } = this.props
    const { id } = this.props.match.params
    const { activeItems, selectAll } = this.state

    return (
      <div>
        <SelectActions
          approveLabel={`Approve ${activeItems.length} ${pluralize('host', activeItems.length)}`}
          rejectLabel={`Reject ${activeItems.length} ${pluralize('host', activeItems.length)}`}
          onSelectAll={this.selectAll}
          activeItems={activeItems}
          selectAll={selectAll}
          approve={() => {
            this.selectedItemsAction(approveUserCampaigns)
          }}
          reject={() => {
            this.selectedItemsAction(rejectUserCampaigns)
          }}
        />
        <Table
          resources={userCampaigns ? userCampaigns : []}
          resourceName="userCampaign"
          HeaderComponent={TableHeader}
          ItemComponent={TableRow}
          total={total}
          page={page}
          action={getUserCampaigns.bind(null, id)}
          isSelected={this.isSelected}
          toggleActive={this.toggleActive}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserCampaigns,
      approveUserCampaigns,
      rejectUserCampaigns,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { userCampaigns, total, page } = selectUserCampaigns(state)
  return {
    userCampaigns,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(UserCampaigns)))
