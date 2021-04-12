import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { AppBar, Tab } from '@material-ui/core'
import Tabs from 'components/layout/Tabs'

const Container = styled.div``

const StyledTabs = styled(Tabs)`
  background: white;
  color: rgba(0, 0, 0, 0.87);
`

const TabsContainer = styled(AppBar)`
  margin-bottom: 1rem;
`

class TabbedPage extends Component {
  handleChange = (e, value) => {
    const { handleTabChange } = this.props
    handleTabChange(value)
  }

  render() {
    const { activeTab, centered } = this.props

    const tabEls = this.props.children.map((el, i) => {
      return <Tab key={`tab=${i}`} label={el.props.title} className="tab-item" />
    })

    const tabContent = this.props.children.map((el, i) => {
      return <Fragment key={`content-${i}`}>{el}</Fragment>
    })

    return (
      <Container>
        <TabsContainer elevation={0} position="static" className="tabs-container">
          <StyledTabs
            indicatorColor="primary"
            value={activeTab}
            centered={centered}
            onChange={this.handleChange}
          >
            {tabEls}
          </StyledTabs>
        </TabsContainer>
        {tabContent[activeTab]}
      </Container>
    )
  }
}

export default TabbedPage
