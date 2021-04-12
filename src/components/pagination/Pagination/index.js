import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const styles = {
  text: {
    margin: '0 10px 0 0',
  },
  pagination: {
    margin: '10px 10px 10px 10px',
  },
}

class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { page, perPage, total, handleChangePage } = this.props

    const start = Math.min((page - 1) * perPage + 1, total)
    const finish = Math.min(page * perPage, total)

    return (
      <div style={styles.pagination}>
        <Typography variant="body1">
          Results <b>{start}</b> - <b>{finish}</b> of <b>{total}</b>
          <IconButton
            size="small"
            onClick={e => handleChangePage(page - 1, e)}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={e => handleChangePage(page + 1, e)}
            disabled={!(finish < total)}
          >
            <ChevronRightIcon />
          </IconButton>
        </Typography>
      </div>
    )
  }
}

Pagination.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number,
}

export default Pagination
