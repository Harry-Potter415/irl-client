import React from 'react'
import { connect } from 'react-redux'
import { Breadcrumb } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { useProduct, useCollection } from 'shopjs/hooks'
import { Spinner, ProductDetails } from 'shopjs/components'
import { withMobile } from 'shopjs/hocs'
import { isHost } from 'helpers/user'
import { selectCurrentUser } from 'selectors/auth'

const ProductShow = ({ match, currentUser }) => {
  const { productHandle, collectionHandle } = match.params

  const [{ product, variant, visibleImages, selectedOptions }, { selectOption }] = useProduct({
    productHandle,
  })

  const { collection } = useCollection({ collectionHandle })

  const isLoaded = !!product && product.id
  return (
    <>
      {/* Show breadcrumbs only if the necessary data is fetched to avoid a flash of different text
       * The collection is necessary only if its handle is in the url */}
      {isHost(currentUser) && product.id && (!collectionHandle || collection.id) && (
        <Breadcrumb
          labelReplacement={{ productHandle: product.title, collectionHandle: collection.title }}
        />
      )}
      {isLoaded ? (
        <ProductDetails
          product={product}
          variant={variant}
          visibleImages={visibleImages}
          selectOption={selectOption}
          selectedOptions={selectedOptions}
        />
      ) : (
        <Spinner />
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(withRouter(withMobile(ProductShow)))
