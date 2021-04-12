import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { selectCurrentUser } from 'selectors/auth'

export const Prices = styled.div`
  && {
    display: flex;
  }
`
export const ProductPrice = styled(Typography)`
  && {
    font-weight: bold;
  }
`
export const CompareAtPrice = styled(Typography)`
  && {
    margin-left: 20px;
  }
`

const Price = props => {
  const { price, compareAtPrice, currentUser } = props
  return (
    <Prices>
      {price !== null && currentUser && <ProductPrice>{price}</ProductPrice>}

      {compareAtPrice !== null && compareAtPrice !== '$0' && currentUser && (
        <CompareAtPrice color="textSecondary">{`Retail: ${compareAtPrice}`}</CompareAtPrice>
      )}
    </Prices>
  )
}

const mapStateToProps = state => {
  const currentUser = selectCurrentUser(state)
  return {
    currentUser,
  }
}

export default connect(mapStateToProps)(Price)
