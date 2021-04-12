import { build } from 'helpers/build'
import { selectList } from 'helpers/selectors'

export const selectUsers = state => selectList(state.adminUsers, 'users')

export const selectUser = (state, id) => {
  return build(state.adminUsers, id, 'user')
}
