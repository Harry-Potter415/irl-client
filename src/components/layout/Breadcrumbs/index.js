import React from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import styled from 'styled-components'
import { theme } from 'components/theme'

const Container = styled.div`
  margin-bottom: 1.5rem;
`
const StyledLink = styled(Link)`
  && {
    color: ${theme.palette.text.primary};
    &:hover {
      text-decoration: none;
    }
  }
`
const StyledNavigateNextIcon = styled(NavigateNextIcon)`
  color: ${theme.palette.text.primary};
`

const Breadcrumbs = props => {
  const { path } = props
  return (
    <Container>
      <MuiBreadcrumbs
        separator={<StyledNavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {path.map(breadcrumb => {
          return breadcrumb.href ? (
            <StyledLink href={breadcrumb.href}>My Orders</StyledLink>
          ) : (
            <Typography color="textPrimary">{breadcrumb.text}</Typography>
          )
        })}
      </MuiBreadcrumbs>
    </Container>
  )
}

export default Breadcrumbs
