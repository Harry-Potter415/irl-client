import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody } from '@material-ui/core'
import Pagination from 'components/layout/Pagination'
import styled from 'styled-components'

const TableContainer = styled.div`
  @media (max-width: 600px) {
    width: 100%;
    overflow-x: scroll;
  }
`

class TableList extends Component {
  render() {
    let {
      resources,
      resourceName,
      HeaderComponent,
      ItemComponent,
      perPage,
      page,
      total,
      action,
      urlPrefix,
      pagination,
      isSelected,
      toggleActive,
    } = this.props
    return (
      <TableContainer>
        <Table>
          <HeaderComponent />
          <TableBody>
            {resources &&
              resources.map((resource, i) => (
                <ItemComponent
                  key={i}
                  isSelected={isSelected}
                  toggleActive={toggleActive}
                  {...{ [resourceName]: resource, urlPrefix }}
                />
              ))}
          </TableBody>
        </Table>
        {pagination && <Pagination perPage={perPage} page={page} total={total} action={action} />}
      </TableContainer>
    )
  }
}

TableList.propTypes = {
  resources: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
  HeaderComponent: PropTypes.elementType,
  ItemComponent: PropTypes.elementType,
  action: PropTypes.func,
  isSelected: PropTypes.func,
  toggleActive: PropTypes.func,
  pagination: PropTypes.bool.isRequired,
}

TableList.defaultProps = {
  resource: [],
  pagination: true,
}

export default TableList
