import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { getShopifyOrder } from 'shopjs/services/Shopify/storefront'
import { getUserCampaign } from 'actions/admin/userCampaigns'
import Title from 'components/layout/Title'
import { formatFullDate } from 'helpers/utils'
import { formatPrice } from 'helpers/orders'
import { Grid, Typography } from '@material-ui/core'
import OrderDetails from 'components/orders/Order/OrderDetails'
import TotalRow from 'components/orders/Order/TotalRow'
import {
  Total,
  CustomerDetailsField,
  OrderDetailsContainer,
  StatusDetailsField,
} from 'components/orders/Order/style'
import { useEvents, useLoading } from 'shopjs/hooks'
import CircularProgress from 'components/loaders/CircularProgress'
import { isEqual, get } from 'lodash'
import { usePrevious } from 'hooks'
import { selectUserCampaign } from 'selectors/admin/userCampaigns'
import { USER_CAMPAIGN_DISPLAY_STATUSES } from 'lib/constants'

const AdminUserCampaign = props => {
  const { userCampaign } = props
  const prevUserCampaign = usePrevious(userCampaign)
  const [order, setOrder] = useState()

  const [{ subscribe, unsubscribe, dispatch }] = useEvents()
  const [isLoading, loadingWrapper] = useLoading({ subscribe, unsubscribe, dispatch })

  useEffect(() => {
    const { id } = props.match.params
    props.getUserCampaign(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isEqual(userCampaign, prevUserCampaign) && userCampaign) {
      const id = get(userCampaign, 'order.shopifyOrderId')
      if (!id) return
      loadingWrapper(getShopifyOrder({ id })).then(res => {
        setOrder({ ...res.node, status: userCampaign.order.status })
      })
    }
  })

  if (isLoading) return <CircularProgress />
  if (!order) return null

  return (
    <div>
      <Title>{`Order #${order.orderNumber}`}</Title>
      <div>{formatFullDate(order.processedAt)}</div>
      <OrderDetailsContainer>
        <StatusDetailsField>
          <Typography variant="body1">Order details</Typography>
          {order.status && (
            <Typography variant="h5">{USER_CAMPAIGN_DISPLAY_STATUSES[order.status]}</Typography>
          )}
        </StatusDetailsField>
        <OrderDetails order={order} />
        <Total>
          <Grid container spacing={2}>
            <TotalRow name="Subtotal" value={formatPrice(order.subtotalPriceV2)} />
            <TotalRow name="Tax" value={formatPrice(order.totalTaxV2)} />
            <TotalRow
              name="Total"
              value={formatPrice(order.totalPriceV2)}
              text="*This price doesn't reflect the actual price"
            />
          </Grid>
        </Total>
        <CustomerDetailsField>
          <Typography variant="h5">Customer</Typography>
          <Typography variant="body1">{`Name: ${get(order, 'shippingAddress.name')}`}</Typography>
          <Typography variant="body1">{`Phone: ${order.phone ? order.phone : ''}`}</Typography>
          <Typography variant="body1">{`Email: ${order.email ? order.email : ''}`}</Typography>
          <Typography variant="body1">
            {`Shipping Address: ${get(order, 'shippingAddress.formatted')}`}
          </Typography>
        </CustomerDetailsField>
      </OrderDetailsContainer>
    </div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserCampaign,
    },
    dispatch
  )

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const userCampaign = selectUserCampaign(state, id)
  return {
    userCampaign,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(AdminUserCampaign))
