import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectAddresses = state => selectList(state.adminAddresses, 'addresses')

export const selectAddress = (state, id) => {
  return build(state.adminAddresses, id, 'address', ['user'])
}
