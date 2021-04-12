import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const ErrorPage = styled.div`
  padding: 60px !important;
  overflow: visible !important;
  height: auto !important;
`
const ErrorMessage = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 20px;
`

const ErrorComponent = ({ componentStack, error }) => (
  <div>
    <ErrorPage open={false}>
      <ErrorMessage>
        We've encountered an error. <br />A report has been sent, we'll look into it ASAP &#x1F6E0;
      </ErrorMessage>
    </ErrorPage>
  </div>
)

export default ErrorComponent
