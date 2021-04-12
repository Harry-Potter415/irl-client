import React from 'react'
import { withRouter } from 'react-router'
import { withAlerts } from 'hocs/withAlerts'
import SearchList from 'shopjs/components/Search/SearchList2'

const Products = () => {
  return <SearchList />
}

export default withRouter(withAlerts(Products))
