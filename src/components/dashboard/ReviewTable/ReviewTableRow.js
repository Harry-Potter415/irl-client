import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@material-ui/core'
import { truncate } from 'helpers/utils'
import moment from 'moment'

const ReviewTableRow = ({ review }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {truncate(review.comment, 130)}
      </TableCell>
      <TableCell component="th" scope="row">
        {review.rating}
      </TableCell>
      <TableCell component="th" scope="row">
        {review.productTitle}
      </TableCell>
      <TableCell component="th" scope="row">
        {review.userEmail}
      </TableCell>
      <TableCell component="th" scope="row">
        {review.userName}
      </TableCell>
      <TableCell component="th" scope="row">
        {moment(review.createdAt).format('MM-DD-YYYY')}
      </TableCell>
    </TableRow>
  )
}

ReviewTableRow.propTypes = {
  review: PropTypes.object.isRequired,
}

export default ReviewTableRow
