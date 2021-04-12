import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid as BaseGrid } from '@material-ui/core'
import Title from 'components/layout/Title'

const Grid = styled(BaseGrid)`
  margin-bottom: 1rem;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

class ListPageHeader extends Component {
  render() {
    const { title } = this.props

    return (
      <Grid container spacing={0} alignItems="center" wrap="nowrap" justify="space-between">
        <Grid item>
          <Title>{title}</Title>
        </Grid>
        <Grid item>{this.props.children}</Grid>
      </Grid>
    )
  }
}

ListPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

ListPageHeader.defaultProps = {
  title: 'List',
}

export default ListPageHeader
