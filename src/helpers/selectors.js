// TODO re-implement with reselect to avoid uneccesary re-computations
// https://www.github.com/reduxjs/reselect
export function selectList(state, resourceName) {
  return (
    state && {
      [resourceName]: Object.values(state[resourceName] || {}),
      total: state.total,
      page: state.page,
      isFetched: state.isFetched,
    }
  )
}
