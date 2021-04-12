import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectProducts = state => selectList(state.products, 'products')

export const selectProduct = (state, id) => {
  return build(state.products, id, 'product', ['reviews'])
}
