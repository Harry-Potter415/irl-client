import React from 'react'
import styled from 'styled-components'
import { CircularProgress as MUICircularProgress } from '@material-ui/core'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`

const CircularProgress = props => {
  return (
    <Container>
      <MUICircularProgress />
    </Container>
  )
}

export default CircularProgress
