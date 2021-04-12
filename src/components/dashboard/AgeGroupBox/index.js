import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectMyHosts } from 'selectors/hosts'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { SIGNUP_OPTIONS } from 'lib/constants'

const DashboardBox = styled.div`
  padding: 20px 10px 20px 10px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  display: flex;
  box-shadow: 4px 4px 7px -7px rgba(0, 0, 0, 0.75);
  flex-direction: column;
`

const ButtonMarker = styled(Button)`
  margin-top: 10px !important;
  cursor: default !important;
  min-width: 95px !important;
  &:hover {
    background-color: #156052 !important;
  }
  span {
    font-size: 12px;
  }
`

const ageRange = ageGroup => {
  if (ageGroup === 'Gen Z') {
    return '14-22'
  } else if (ageGroup === 'Millenial') {
    return '22-37'
  } else if (ageGroup === 'Gen X') {
    return '38-53'
  } else if (ageGroup === 'Baby Boomers') {
    return '54-72'
  }
}

const AgeGroupBox = ({ myAgeGroups }) => {
  return (
    <DashboardBox>
      <Typography variant="body1">
        <b>Age Group</b>
      </Typography>
      <Grid container>
        {SIGNUP_OPTIONS.ageGroups
          .map(option => option.value)
          .map((ageGroup, i) => (
            <Grid item xs={6} key={i}>
              <ButtonMarker
                color="primary"
                variant="contained"
                size="small"
                disabled={myAgeGroups && !myAgeGroups.includes(ageGroup)}
              >
                {ageGroup} | {ageRange(ageGroup)}
              </ButtonMarker>
            </Grid>
          ))}
      </Grid>
    </DashboardBox>
  )
}

const mapStateToProps = state => {
  const { myAgeGroups } = selectMyHosts(state)
  return {
    myAgeGroups,
  }
}

export default connect(mapStateToProps)(AgeGroupBox)
