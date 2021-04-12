import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../../loaders/Loader'

class Spinner extends Component {
  render() {
    const { isFetching } = this.props
    return <Loader isLoading={isFetching} />
  }
}

const mapStateToProps = state => {
  const { isFetching, isFetched, error } = state.loaders
  return {
    isFetching,
    isFetched,
    error,
  }
}

export default connect(mapStateToProps)(Spinner)
