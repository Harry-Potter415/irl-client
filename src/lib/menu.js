import React from 'react'
import CampaignIcon from 'icons/CampaignIcon'
import ProductIcon from 'icons/ProductIcon'
import UserIcon from 'icons/UserIcon'
import AddressIcon from 'icons/AddressIcon'
import CommentIcon from 'icons/CommentIcon'
import PropertyIcon from 'icons/PropertyIcon'
import CartIcon from 'icons/CartIcon'
import OrdersIcon from 'icons/OrdersIcon'
import { theme } from 'components/theme'
import styled from 'styled-components'

const StyledCommentIcon = styled(CommentIcon)`
  stroke-width: 10;
`
const StyledOrdersIcon = styled(OrdersIcon)`
  && {
    font-size: 27px;
    path {
      fill: ${theme.palette.text.secondary};
    }
  }
`
const StyledCartIcon = styled(CartIcon)`
  path {
    fill: ${theme.palette.text.secondary};
  }
`

const styles = {
  icon: { fontSize: '32px' },
}

/* definitions of common menu items */
const campaigns = {
  id: 'campaigns',
  path: '/placements',
  text: 'Placements',
  icon: <CampaignIcon style={styles.icon} />,
}
const products = {
  id: 'products',
  path: '/products',
  text: 'Products',
  icon: <ProductIcon style={styles.icon} />,
}

const dashboard = {
  id: 'dashboard',
  path: '/dashboard',
  text: 'Dashboard',
  icon: <PropertyIcon style={styles.icon} />,
}

export const MENU_ITEMS = {
  brand: [products, dashboard, campaigns],
  host: [
    campaigns,
    { id: 'shop', path: '/shop', text: 'Shop', icon: <PropertyIcon style={styles.icon} /> },
    {
      id: 'cart',
      path: '/shop/cart',
      text: 'My Cart',
      icon: <StyledCartIcon style={styles.icon} />,
    },
    {
      id: 'orders',
      path: '/orders',
      text: 'My Orders',
      icon: <StyledOrdersIcon />,
    },
  ],
  admin: [
    {
      id: 'adminCampaigns',
      path: '/admin/placements',
      text: 'Placements',
      icon: <CampaignIcon style={styles.icon} />,
    },
    {
      id: 'adminProducts',
      path: '/admin/products',
      text: 'Products',
      icon: <ProductIcon style={styles.icon} />,
    },
    {
      id: 'adminUsers',
      path: '/admin/users',
      text: 'Users',
      icon: <UserIcon style={styles.icon} />,
    },
    {
      id: 'adminMessages',
      path: '/admin/text_messages',
      text: 'Text Messages',
      icon: <AddressIcon style={styles.icon} />,
    },
    {
      id: 'adminAddresses',
      path: '/admin/addresses',
      text: 'Addresses',
      icon: <AddressIcon style={styles.icon} />,
    },
    {
      id: 'adminReviews',
      path: '/admin/reviews',
      text: 'Reviews',
      icon: <StyledCommentIcon style={styles.icon} />,
    },
    {
      id: 'adminOrders',
      path: '/admin/orders',
      text: 'Orders',
      icon: <StyledOrdersIcon />,
    },
  ],
}
