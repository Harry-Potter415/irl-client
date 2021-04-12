export const renderAddressLine1 = address =>
  [address.address1, address.address2].filter(notEmpty).join(', ')

export const renderAddressLine2 = address => {
  let line2 = [address.city, address.zipcode].filter(notEmpty).join(', ')
  line2 = [line2, address.country].filter(notEmpty).join(' ')
  return line2
}

const notEmpty = obj => obj && obj.length > 0
