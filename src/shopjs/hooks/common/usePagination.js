import { useState } from 'react'

const usePagination = items => {
  // The current page number
  const [pageNumber, setPageNumber] = useState(0)

  const page = items[pageNumber] ? items[pageNumber] : null

  const hasPage = !!(page && page.length)
  const hasPreviousPage = hasPage && page[0].hasPreviousPage
  const hasNextPage = hasPage && page[page.length - 1].hasNextPage

  const lastPage = items && items[items.length - 1]
  const hasLastPage = !!(lastPage && lastPage.length)
  const cursor = hasLastPage && lastPage[lastPage.length - 1].cursor

  const getPreviousPage = () => hasPreviousPage && setPageNumber(pageNumber - 1)
  const getNextPage = () => hasNextPage && setPageNumber(pageNumber + 1)

  return [
    { page, hasNextPage, hasPreviousPage, pageNumber, cursor },
    { getPreviousPage, getNextPage, setPageNumber },
  ]
}

export default usePagination
