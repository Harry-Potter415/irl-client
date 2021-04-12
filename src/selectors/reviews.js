export const selectReviews = state => {
  const { reviews } = state
  return {
    reviews: Object.values(reviews.myReviews || {}),
  }
}
