import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { getShopifyOrder } from 'shopjs/services/Shopify/storefront'
import { getOrder } from 'actions/orders'
import Title from 'components/layout/Title'
import moment from 'moment'
import { formatPrice } from 'helpers/orders'
import { Grid, Typography } from '@material-ui/core'
import OrderDetails from 'components/orders/Order/OrderDetails'
import TotalRow from 'components/orders/Order/TotalRow'
import { Total, OrderDetailsContainer, StatusDetailsField } from 'components/orders/Order/style'
import { useEvents, useLoading } from 'shopjs/hooks'
import CircularProgress from 'components/loaders/CircularProgress'
import { isEqual } from 'lodash'
import { usePrevious } from 'hooks'
import { selectOrder } from 'selectors/orders'
import styled from 'styled-components'
import Breadcrumbs from 'components/layout/Breadcrumbs'
import { theme } from 'components/theme'

const Date = styled.div`
  margin-top: 5px;
`
const HeaderGrid = styled(Grid)`
  display: flex;
  align-items: center;
  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`
const Quantity = styled(Typography)`
  && {
    margin-left: 16%;
    margin-right: 10px;
  }
`

const Order = props => {
  const prevOrder = usePrevious(props.order)
  const [order, setOrder] = useState()

  const [{ subscribe, unsubscribe, dispatch }] = useEvents()
  const [isLoading, loadingWrapper] = useLoading({ subscribe, unsubscribe, dispatch })

  useEffect(() => {
    const { id } = props.match.params
    props.getOrder(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isEqual(props.order, prevOrder) && props.order) {
      const id = props.order.shopifyOrderId
      loadingWrapper(getShopifyOrder({ id })).then(res => {
        setOrder({ ...res.node, status: props.order.status })
      })
    }
  })

  if (isLoading) return <CircularProgress />
  if (!order) return null

  return (
    <div>
      <Breadcrumbs
        path={[{ text: 'My Orders', href: '/orders' }, { text: `Order #${order.orderNumber}` }]}
      />
      <Title>My Orders</Title>
      <OrderDetailsContainer>
        <StatusDetailsField>
          <Grid container spacing={2}>
            <Grid md={9}>
              <Typography variant="h4">{`Order #${order.orderNumber}`}</Typography>
              <Date>{moment(order.processedAt).format('MM/DD/YY H:mmA')}</Date>
            </Grid>
            <HeaderGrid md={2}>
              <Typography variant="body1">Unit Price</Typography>
              <Quantity variant="body1">Quantity</Quantity>
            </HeaderGrid>
            <HeaderGrid md={1}>
              <Typography variant="body1">Total</Typography>
            </HeaderGrid>
          </Grid>
        </StatusDetailsField>
        <OrderDetails order={order} />
        <Total>
          <Grid container spacing={2}>
            <TotalRow name="Subtotal" value={formatPrice(order.subtotalPriceV2)} />
            <TotalRow name="Tax" value={formatPrice(order.totalTaxV2)} />
            <TotalRow name="Total" value={formatPrice(order.totalPriceV2)} />
          </Grid>
        </Total>
      </OrderDetailsContainer>
    </div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrder,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const order = selectOrder(state, id)
  return {
    order,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(Order))
