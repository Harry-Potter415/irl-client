import mem from 'mem'
import api from 'api'

const fetchBrandsNow = () =>
  api
    .get('/api/v1/public/users/brands')
    .then(
      // create a data object with ids as keys and names as value (e.g. { 23: 'Foo Brand' })
      response =>
        response.data &&
        response.data.data.reduce(
          (accu, { attributes }) => ({
            ...accu,
            [attributes.id]: attributes.company || attributes.name,
          }),
          {}
        )
    )
    .catch(error => {
      console.error('Error fetching brands', error.message)
      return {}
    })

// brands query with cached results (10 minutes)
export const fetchBrands = mem(fetchBrandsNow, { maxAge: 600000 })

export const getBrandName = async id => (await fetchBrands())[id]
