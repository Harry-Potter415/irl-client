export const formatPrice = price => {
  if (!price) return null
  if (price.currencyCode === 'USD') {
    return `$${price.amount}`
  } else {
    return `${price.amount} ${price.currencyCode}`
  }
}
