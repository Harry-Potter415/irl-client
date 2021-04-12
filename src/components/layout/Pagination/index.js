import React from 'react'
import { default as FlatPagination } from 'material-ui-flat-pagination'
import { PER_PAGE } from 'config'
import { pageToOffset, offsetToPage } from 'helpers/pagination'
import styled from 'styled-components'

const StyledFlatPagination = styled(FlatPagination)`
  button {
    &:first-child,
    &:last-child {
      display: none;
    }
  }
`

class Pagination extends React.Component {
  limit() {
    const { perPage } = this.props
    return perPage || PER_PAGE
  }

  handleClick(offset) {
    const { action } = this.props
    const page = offsetToPage(offset, this.limit())
    action(page)
  }

  render() {
    const { total, page } = this.props
    const offset = pageToOffset(page, this.limit())
    return (
      <StyledFlatPagination
        limit={this.limit()}
        offset={offset}
        total={total}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    )
  }
}

export default Pagination
