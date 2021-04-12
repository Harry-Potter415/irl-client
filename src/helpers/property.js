export const fullAddress = property => {
  const { address1, address2, city, state, country, zipcode } = property
  return [address1, address2, city, state, country, zipcode]
    .filter(item => item && item.trim().length > 0)
    .join(', ')
}
