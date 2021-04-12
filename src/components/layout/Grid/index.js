import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Pagination from 'components/layout/Pagination'
import styled from 'styled-components'
import { PER_PAGE } from 'config'

const StyledGrid = styled(Grid)`
  margin-top: 20px !important;
`

class GridList extends Component {
  render() {
    let {
      resources,
      resourceName,
      ItemComponent,
      page,
      total,
      action,
      urlPrefix,
      itemProps,
    } = this.props
    return (
      <Fragment>
        <StyledGrid container spacing={0}>
          {resources &&
            resources.map(resource => {
              return (
                <Grid key={resource.id} item xs={12} sm={6} md={4} lg={3}>
                  <ItemComponent {...{ [resourceName]: resource, urlPrefix, ...itemProps }} />
                </Grid>
              )
            })}
        </StyledGrid>
        {total > PER_PAGE && <Pagination page={page} total={total} action={action} />}
      </Fragment>
    )
  }
}

GridList.propTypes = {
  resources: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
  ItemComponent: PropTypes.elementType,
}

GridList.defaultProps = {
  resource: [],
}

export default GridList
