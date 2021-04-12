import React, { useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { withRouter } from 'react-router'
import { Drawer, MenuItem, Divider } from '@material-ui/core'
import { StyledMenuList } from './styles'

const Menu = ({ menuOpen, handleMenuToggle, history }) => {
  const {
    accountAuth: { isLoggedIn, signout },
    collections: { collections },
  } = useContext(ShopifyContext)

  const handleClick = path => {
    history.push(path)
    handleMenuToggle()
  }

  return (
    <Drawer variant="temporary" anchor="left" open={menuOpen} onClose={handleMenuToggle}>
      <StyledMenuList>
        <MenuItem onClick={e => handleClick('/shop/search?')} aria-label="Shop All">
          Shop All
        </MenuItem>
        {collections &&
          collections.map(({ title, handle }) => (
            <MenuItem
              onClick={e => handleClick(`/shop/collections/${handle}`)}
              key={title}
              aria-label={`Collection ${title}`}
            >
              {title}
            </MenuItem>
          ))}
        <Divider />
        <MenuItem onClick={e => handleClick('/cart')} aria-label="My Cart">
          My Cart
        </MenuItem>
        {isLoggedIn ? (
          <>
            <MenuItem onClick={e => handleClick('/orders')} aria-label="My Orders">
              My Orders
            </MenuItem>
            <MenuItem onClick={e => handleClick('/account')} aria-label="My Account">
              My Account
            </MenuItem>
            <MenuItem onClick={e => handleClick('/account/address')} aria-label="My Address">
              My Address
            </MenuItem>
            <MenuItem onClick={e => signout()} aria-label="Sign out">
              Sign Out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={e => handleClick('/login')} aria-label="Login">
              Login
            </MenuItem>
            <MenuItem onClick={e => handleClick('/signup')} aria-label="Sign up">
              Sign Up
            </MenuItem>
          </>
        )}
      </StyledMenuList>
    </Drawer>
  )
}

export default withRouter(Menu)
