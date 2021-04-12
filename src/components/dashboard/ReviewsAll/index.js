import React from 'react'
import Grid from '@material-ui/core/Grid'
import ReviewTable from 'components/dashboard/ReviewTable'

const ReviewsAll = () => {
  return (
    <Grid container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ReviewTable />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewsAll
