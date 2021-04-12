import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectProducts = state => selectList(state.adminProducts, 'products')

export const selectProduct = (state, id) => {
  return build(state.adminProducts, id, 'product', ['user', 'reviews'])
}
