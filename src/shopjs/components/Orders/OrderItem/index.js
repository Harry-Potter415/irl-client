import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { withRouter } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import config from 'shopjs/config'

const OrderItem = ({ order, history }) => {
  const {
    formatters: { dateTime, currency },
  } = useContext(ShopifyContext)

  const handleClick = () => {
    history.push(`/orders/${order.orderNumber}`)
  }

  const orderDate = dateTime.format(new Date(order.processedAt))

  const styles = {
    avatar: {
      color: config.theme.colors.primary,
    },
  }

  return (
    <ListItem button dense onClick={handleClick}>
      <ListItemIcon>
        <ShoppingCart style={styles.avatar} />
      </ListItemIcon>
      <ListItemText
        primary={<span>Order Confirmation #{order.orderNumber}</span>}
        secondary={<span>Ordered on {orderDate}</span>}
      />
      <ListItemSecondaryAction>Total {currency.format(order.totalPrice)}</ListItemSecondaryAction>
    </ListItem>
  )
}

export default withRouter(OrderItem)
