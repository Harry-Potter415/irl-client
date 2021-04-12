import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { MoreHoriz, ChevronRight, ChevronLeft } from '@material-ui/icons'
import { PRIMARY_GREEN } from 'lib/colors'
import styled from 'styled-components'

const PageButton = styled(IconButton)`
  height: 34px;
  width: 34px;
  padding: 6px;
  font-size: 14px !important;
  ${props => (props.highlight === 'true' ? `background-color: ${PRIMARY_GREEN} !important;` : null)}
  ${props => (props.highlight === 'true' ? `color: #fff !important;` : null)}
`

const SearchPagination = ({ currentPage, nbPages, refine }) => {
  const [rangeWithDots, setRangeWithDots] = useState([])

  const pagination = (current, last) => {
    let delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    setRangeWithDots(rangeWithDots)
  }

  useEffect(() => pagination(currentPage, nbPages))

  return (
    <Box display="flex" justifyContent="align-center" width="100%">
      {nbPages && nbPages > 0 && (
        <>
          <div>
            <PageButton
              disabled={currentPage <= 1 ? true : false}
              size="small"
              onClick={e => refine(currentPage - 1)}
            >
              <ChevronLeft />
            </PageButton>
          </div>
          {rangeWithDots.length > 0 &&
            rangeWithDots.map((page, i) =>
              page === '...' ? (
                <PageButton key={i}>
                  <MoreHoriz />
                </PageButton>
              ) : (
                <PageButton
                  key={i}
                  highlight={page === currentPage ? 'true' : 'false'}
                  size="small"
                  onClick={e => refine(page)}
                >
                  {page}
                </PageButton>
              )
            )}
          <div>
            <PageButton
              disabled={currentPage === nbPages ? true : false}
              size="small"
              onClick={e => refine(currentPage + 1)}
            >
              <ChevronRight />
            </PageButton>
          </div>
        </>
      )}
    </Box>
  )
}

export default SearchPagination
