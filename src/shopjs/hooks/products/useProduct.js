import { useContext, useState, useEffect } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { isEqual } from 'lodash'
import { fetchProduct } from 'shopjs/services/Shopify/buy'

const useProduct = props => {
  const {
    loading: { loadingWrapper },
    notify: { showAlertError },
    errors: { setError },
    events: { dispatch },
  } = useContext(ShopifyContext)

  let { productHandle } = props

  let [product, setProduct] = useState({})
  let [variant, setVariant] = useState({})
  let [selectedOptions, setOptions] = useState({})
  let [visibleImages, setVisibleImages] = useState([])

  // Select an option and attempt to match to a variant
  const selectOption = (name, value) => {
    let options = {
      ...selectedOptions,
      [name]: value,
    }
    selectVariantByOptions(options)
    if (name === 'Color') selectColorVariantByOption(value)
  }

  const selectColorVariantByOption = color => {
    let colorVariants = product.variants.filter(v => v.selectedOptions['Color'] === color)
    let variantImageUrl = colorVariants.find(v => v.imageUrl)
    if (variantImageUrl) {
      setProduct({
        ...product,
        variantImageUrl,
      })
    }
  }

  // Find the variant matching the selected options
  const selectVariantByOptions = options => {
    product &&
      product.variants.forEach(variant => {
        // the third option is the "real" option, so use that to compare
        if (isEqual(Object.values(variant.selectedOptions)[2], Object.values(options)[2])) {
          setVariant(variant)
          updateVisibleImages(product, variant)
          setOptions(variant.selectedOptions)
        }
      })
  }

  // Return only the selected variant image and product images
  // for rendering
  const updateVisibleImages = (product, variant) => {
    if (!product || !variant) return
    const images = product.images
    variant.imageUrl && images.unshift(variant.imageUrl)
    setVisibleImages([...new Set(images)])
  }

  // Set a default variant and selected options
  // so customer is always able to add to cart
  const setDefaultVariant = product => {
    variant = product.variants && product.variants[0]
    setVariant(variant)
    setOptions(variant.selectedOptions)
    updateVisibleImages(product, variant)
  }

  const loadProduct = async productHandle => {
    try {
      let product = await loadingWrapper(fetchProduct(productHandle))
      setProduct(product)
      setDefaultVariant(product)
      dispatch('productLoaded', { id: product.id, handle: productHandle })
    } catch (error) {
      setError(error)
      showAlertError('The product cannot be loaded')
    }
  }

  const mergeProduct = product => {
    setProduct(product)
    setDefaultVariant(product)
  }

  // Only fetch a product by productHandle if the
  // Shopify product prop was not provided, otherwise
  // normalize the product and set the variant defaults
  useEffect(() => {
    if (props.product) {
      mergeProduct(props.product)
    } else {
      loadProduct(productHandle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productHandle])

  return [{ product, variant, visibleImages, selectedOptions }, { selectOption }]
}

export default useProduct
