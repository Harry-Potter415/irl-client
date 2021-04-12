import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { globalStyles } from 'components/globalStyles'
import { selectSidebarDisabled, selectSidebarOpen } from 'selectors/layout'
import classNames from 'classnames'

const ContentLayout = styled.div`
  flex-grow: 1;
  min-height: 100vh;
  width: 100%;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: ${globalStyles.content.padding}px;

  @media (min-width: 600px) {
    padding-top: 50px;
    padding-left: 90px;

    &.sidebar-open {
      padding-left: 170px;
    }

    &.sidebar-disabled {
      padding-left: 0;
    }
  }
`
class Content extends Component {
  render() {
    const { isSidebarOpen, isSidebarDisabled } = this.props
    return (
      <ContentLayout
        className={classNames({
          'sidebar-open': isSidebarOpen,
          'sidebar-disabled': isSidebarDisabled,
        })}
      >
        {this.props.children}
      </ContentLayout>
    )
  }
}

const mapStateToProps = state => {
  const isSidebarDisabled = selectSidebarDisabled(state)
  const isSidebarOpen = selectSidebarOpen(state)
  return {
    isSidebarDisabled,
    isSidebarOpen,
  }
}

export default connect(mapStateToProps)(Content)
