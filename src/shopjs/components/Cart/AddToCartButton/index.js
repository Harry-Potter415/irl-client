import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ShopifyContext } from 'shopjs/context'
import { StyledButton } from './styles'
import { get } from 'lodash'
import { selectCurrentUser } from 'selectors/auth'

const AddToCartButton = ({ variant, quantity, productHandle, currentUser, history }) => {
  const {
    cart: { addLineItem, handleOpenCart },
  } = useContext(ShopifyContext)

  let available = get(variant, 'available')
  let variantId = get(variant, 'id')

  const handleAddToCart = e => {
    if (quantity <= 0) return
    if (currentUser) {
      addLineItem(variantId, quantity, productHandle)
      handleOpenCart()
    } else {
      history.push('/signup')
    }
  }

  const canAddItemToCart = !!available || quantity > 0

  return (
    <StyledButton
      fullWidth
      size="large"
      color="primary"
      variant="contained"
      disabled={!canAddItemToCart}
      onClick={handleAddToCart}
    >
      Add to Cart
    </StyledButton>
  )
}

const mapStateToProps = state => {
  const currentUser = selectCurrentUser(state)
  return {
    currentUser,
  }
}

export default connect(mapStateToProps)(withRouter(AddToCartButton))
