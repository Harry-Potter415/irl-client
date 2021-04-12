import { build } from 'helpers/build'

export const selectUser = (state, id) => {
  return build(state.publicReviews, id, 'user', ['receivedProducts'])
}
