import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectMyAddresses = state => selectList(state.addresses, 'addresses')

export const selectAddress = (state, id) => {
  return build(state.addresses, id, 'address')
}
