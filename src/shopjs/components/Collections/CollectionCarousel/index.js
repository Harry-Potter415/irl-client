import React from 'react'
import { withRouter } from 'react-router-dom'
import { ProductCarousel, Spinner } from 'shopjs/components'
import { useProducts } from 'shopjs/hooks'

const CollectionCarousel = ({ collectionHandle, title, description, history }) => {
  const { isLoaded, products } = useProducts({ collectionHandle })

  return (
    <>
      {isLoaded ? (
        <ProductCarousel
          title={title}
          text={description}
          link={`/shop/collections/${collectionHandle}`}
          naturalSlideWidth={185}
          naturalSlideHeight={335}
          totalSlides={products.length}
          products={products}
        />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default withRouter(CollectionCarousel)
