import React from 'react'
import { Typography } from '@material-ui/core'

const SearchStats = ({ currentPage, nbHits, hitsPerPage }) => {
  const start = nbHits > 0 ? parseInt(currentPage - 1) * parseInt(hitsPerPage) + 1 : 0
  const finish = Math.min(nbHits, parseInt(currentPage) * parseInt(hitsPerPage))
  return (
    <Typography variant="body2">
      Results <b>{start}</b>-<b>{finish}</b> of <b>{nbHits}</b>
    </Typography>
  )
}

export default SearchStats
