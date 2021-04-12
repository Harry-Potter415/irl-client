import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { getOrders } from 'actions/orders'
import { selectOrders } from 'selectors/orders'
import { getShopifyOrders } from 'shopjs/services/Shopify/storefront'
import { usePrevious } from 'hooks'
import { isEqual, orderBy, cloneDeep } from 'lodash'
import Title from 'components/layout/Title'
import { useEvents, useLoading } from 'shopjs/hooks'
import CircularProgress from 'components/loaders/CircularProgress'
import { TitleWrapper, OrdersTable, OrderTypeTabs } from './style'
import { Table } from '@material-ui/core'
import OrderFilters from 'components/orders/OrderFilters'
import TabbedPage from 'components/layout/TabbedPage'
import TabContent from 'components/layout/TabContent'
import OrdersTableHeader from 'components/orders/OrdersTableHeader'
import OrdersTableBody from 'components/orders/OrdersTableBody'
import {
  filterProductName,
  filterProductType,
  filterStatus,
  filterOrderType,
} from 'helpers/orders/filters'
import { buildOrderLineItems } from 'helpers/orders/buildLineItems'
import { ORDER_TYPES } from 'lib/constants'

const Orders = props => {
  const prevOrders = usePrevious(props.orders)
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  const [{ subscribe, unsubscribe, dispatch }] = useEvents()
  const [isLoading, loadingWrapper] = useLoading({ subscribe, unsubscribe, dispatch })

  const defaultFilters = {
    productType: null,
    productName: null,
    orderNumber: null,
    orderType: null,
    status: null,
  }

  const [filters, setFilters] = useState(defaultFilters)
  const [filtersTimeout, setFiltersTimeout] = useState(null)

  const changeFilters = filters => {
    const get = () => props.getOrders(filters)
    clearTimeout(filtersTimeout)
    setFilters(filters)
    const timeout = setTimeout(get, 500)
    setFiltersTimeout(timeout)
  }

  const addDbData = shopifyOrders => {
    return shopifyOrders.map(shopifyOrder => {
      const order = props.orders.find(order => order.shopifyOrderId === shopifyOrder.id)
      return {
        ...shopifyOrder,
        status: order && order.status,
        dbId: order.id,
        userCampaigns: order.userCampaigns,
      }
    })
  }

  const extractOrders = checkouts => {
    return checkouts.nodes
      .filter(node => Boolean(node.order))
      .map(node => {
        return {
          ...node.order,
          lineItems: node.lineItems,
        }
      })
  }

  const filterLineItems = (orders, filterFn) =>
    orders.filter(order => {
      order.lineItems = order.lineItems.filter(lineItem => filterFn(lineItem))
      return order
    })

  const buildLineItems = shopifyOrders => {
    const result = cloneDeep(shopifyOrders)
    result.map(order => {
      order.lineItems = buildOrderLineItems(order)
      return order
    })
    return result
  }

  const localFilter = shopifyOrders => {
    let result = buildLineItems(shopifyOrders)
    if (filters.productName) {
      result = filterLineItems(result, filterProductName.bind(null, filters.productName))
    }
    if (filters.productType) {
      result = filterLineItems(result, filterProductType.bind(null, filters.productType))
    }
    if (filters.status) {
      result = filterLineItems(result, filterStatus.bind(null, filters.status))
    }
    if (filters.orderType) {
      result = filterLineItems(result, filterOrderType.bind(null, filters.orderType))
    }
    // remove orders with no lineItems left
    return result.filter(order => order.lineItems.length > 0)
  }

  useEffect(() => {
    props.getOrders(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isEqual(props.orders, prevOrders)) {
      const ids = props.orders.map(order => order.shopifyCheckoutId)
      loadingWrapper(getShopifyOrders({ ids })).then(res => {
        const processedRes = extractOrders(res)
        const ordersToSet = orderBy(
          addDbData(processedRes.filter(order => Boolean(order))),
          'processedAt',
          'desc'
        )
        setOrders(ordersToSet)
        setFilteredOrders(localFilter(ordersToSet))
      })
    }
  })

  useEffect(() => {
    setFilteredOrders(localFilter(orders))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, filters.productName, filters.productType, filters.orderType])

  const TABS = {
    0: null,
    1: ORDER_TYPES.placement,
    2: ORDER_TYPES.shop,
  }

  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = tab => {
    setActiveTab(tab)
    changeFilters({ ...filters, orderType: TABS[tab] })
  }

  return (
    <OrdersTable>
      <TitleWrapper>
        <Title>My Orders</Title>
        <OrderTypeTabs>
          <TabbedPage activeTab={activeTab} handleTabChange={handleTabChange}>
            <TabContent title="All Orders"></TabContent>
            <TabContent title="Placements"></TabContent>
            <TabContent title="Shop"></TabContent>
          </TabbedPage>
        </OrderTypeTabs>
        <OrderFilters filters={filters} changeFilters={changeFilters} />
      </TitleWrapper>
      <Table>
        <OrdersTableHeader />
        {isLoading ? <CircularProgress /> : <OrdersTableBody orders={filteredOrders} />}
      </Table>
    </OrdersTable>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrders,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { orders } = selectOrders(state)
  return {
    orders,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(Orders))
