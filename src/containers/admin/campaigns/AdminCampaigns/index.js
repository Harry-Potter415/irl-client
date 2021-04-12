import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import { getCampaigns, approveCampaigns, rejectCampaigns } from 'actions/admin/campaigns'
import { selectCampaigns } from 'selectors/admin/campaigns'
import AdminIndex from 'components/admin/AdminIndex'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/campaigns/CampaignTableHeader'
import TableRow from 'components/admin/campaigns/CampaignTableRow'
import SelectActions from 'components/layout/Table/SelectActions'
import { toggleActive, selectAll, isSelected, selectedItemsAction } from 'helpers/select-items'
import pluralize from 'pluralize'
import { orderBy } from 'lodash'
import CampaignFilters from 'components/admin/campaigns/CampaignFilters'

class AdminCampaigns extends Component {
  constructor() {
    super()
    this.state = {
      activeItems: [],
      selectAll: false,
      filters: {
        id: null,
        title: null,
        startDate: null,
        endDate: null,
        status: null,
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
    this.props.getCampaigns(filters)
  }

  changeFilters = (filter, value) => {
    const { filters } = this.state
    const { getCampaigns } = this.props
    const get = () => getCampaigns(filters, 1)
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

  getItems() {
    const { campaigns } = this.props
    return campaigns.map(campaign => campaign.id)
  }

  render() {
    let {
      campaigns,
      history,
      total,
      page,
      getCampaigns,
      approveCampaigns,
      rejectCampaigns,
    } = this.props
    const { activeItems, selectAll, filters } = this.state
    return (
      <Fragment>
        <CampaignFilters filters={filters} changeFilter={this.changeFilters} />
        <AdminIndex
          resourceName="campaign"
          displayedResourceName="placement"
          history={history}
          actions={
            <SelectActions
              approveLabel={`Approve ${activeItems.length} ${pluralize(
                'campaign',
                activeItems.length
              )}`}
              rejectLabel={`Reject ${activeItems.length} ${pluralize(
                'campaign',
                activeItems.length
              )}`}
              onSelectAll={this.selectAll}
              activeItems={activeItems}
              selectAll={selectAll}
              approve={() => this.selectedItemsAction(approveCampaigns)}
              reject={() => this.selectedItemsAction(rejectCampaigns)}
            />
          }
        >
          {campaigns && (
            <Table
              resources={orderBy(campaigns, 'createdAt', 'desc')}
              resourceName="campaign"
              HeaderComponent={TableHeader}
              ItemComponent={TableRow}
              total={total}
              page={page}
              action={getCampaigns.bind(null, filters)}
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
      getCampaigns,
      approveCampaigns,
      rejectCampaigns,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { campaigns, total, page } = selectCampaigns(state)
  return {
    campaigns,
    total,
    page,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(AdminCampaigns)))
