import { build } from 'helpers/build'
import { buildList } from 'helpers/build'

export const selectReviews = state => buildList(state.adminReviews, 'reviews', ['product'])

export const selectReview = (state, id) =>
  build(state.adminReviews, id, 'review', ['product', 'images'])
