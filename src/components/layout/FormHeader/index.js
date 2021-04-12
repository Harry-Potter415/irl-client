import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem 0;
`
const Subtitle = styled(Typography)`
  text-align: center;
  @media (max-width: 600px) {
    font-size: 0.63rem;
    text-align: left;
  }
`

const Title = styled(Typography)`
  @media (max-width: 600px) {
    text-align: left !important;
  }
`

const FormHeader = ({ title, subtitle }) => (
  <Container>
    <Subtitle component="div" variant="caption">
      {subtitle}
    </Subtitle>
    <Title component="div" align="center" variant="inherit" className="title">
      {title}
    </Title>
  </Container>
)

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default FormHeader
