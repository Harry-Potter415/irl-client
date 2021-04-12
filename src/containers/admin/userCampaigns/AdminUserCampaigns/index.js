import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import {
  getAllUserCampaigns,
  approveUserCampaigns,
  rejectUserCampaigns,
} from 'actions/admin/userCampaigns'
import { selectUserCampaigns } from 'selectors/admin/userCampaigns'
import Table from 'components/layout/Table'
import TableHeader from 'components/admin/userCampaigns/UserCampaignTableHeader'
import TableRow from 'components/admin/userCampaigns/UserCampaignTableRow'
import { getShopifyOrders } from 'shopjs/services/Shopify/storefront'
import { useEvents, useLoading } from 'shopjs/hooks'
import { usePrevious } from 'hooks'
import { isEqual } from 'lodash'
import UserCampaignFilters from 'components/admin/userCampaigns/UserCampaignFilters'

const AdminUserCampaigns = props => {
  const { total, page, getAllUserCampaigns } = props
  const prevUserCampaigns = usePrevious(props.userCampaigns)
  const [userCampaigns, setUserCampaigns] = useState([])
  const [{ subscribe, unsubscribe, dispatch }] = useEvents()
  const [, loadingWrapper] = useLoading({ subscribe, unsubscribe, dispatch })
  const [filtersTimeout, setFiltersTimeout] = useState(null)

  const defaultFilters = {
    orderNumber: null,
    campaignId: null,
    host: null,
    company: null,
    status: null,
  }

  const [filters, setFilters] = useState(defaultFilters)

  const changeFilters = filters => {
    const get = () => getAllUserCampaigns(filters, 1)
    clearTimeout(filtersTimeout)
    setFilters(filters)
    const timeout = setTimeout(get, 500)
    setFiltersTimeout(timeout)
  }

  useEffect(() => {
    props.getAllUserCampaigns(filters, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isEqual(props.userCampaigns, prevUserCampaigns)) {
      const ids = props.userCampaigns.map(u => u.order.shopifyOrderId).filter(id => id != null)
      loadingWrapper(getShopifyOrders({ ids })).then(res => {
        const newUserCampaigns = props.userCampaigns.map(userCampaign => {
          if (userCampaign.order && userCampaign.order.id) {
            const order = res.nodes.find(node => node.id === userCampaign.order.shopifyOrderId)
            userCampaign.order = { ...userCampaign.order, ...order }
          }
          return userCampaign
        })
        setUserCampaigns(newUserCampaigns)
      })
    }
  })

  return (
    <div>
      <UserCampaignFilters filters={filters} changeFilters={changeFilters} />
      <Table
        resources={userCampaigns ? userCampaigns : []}
        resourceName="userCampaign"
        HeaderComponent={TableHeader}
        ItemComponent={TableRow}
        total={total}
        page={page}
        action={getAllUserCampaigns.bind(null, filters)}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllUserCampaigns,
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
)(withRouter(withAlerts(AdminUserCampaigns)))
