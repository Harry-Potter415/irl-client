import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router'
import Routes from 'components/routes'
import Alert from 'components/alerts/Alert'
import Spinner from 'components/alerts/Spinner'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from 'components/theme'
import Header from 'components/headers/Header'
import SimpleHeader from 'components/headers/SimpleHeader'
import styled, { ThemeProvider } from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import ErrorComponent from 'components/error/ErrorComponent'
import Content from 'components/layout/Content'
import { Container } from 'components/layout/Container'
import 'pure-react-carousel/dist/react-carousel.es.css'
import withAnalytics from 'hocs/withAnalytics'

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
`

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

const App = props => {
  useEffect(props.analytics.initialize, [])

  const simpleHeader = () => {
    const pathName = props.location.pathname
    return !!pathName.match(/\/reviews\/\d+$/)
  }

  return (
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <CssBaseline />
            <Wrapper>
              <Spinner />
              <Alert />
              {simpleHeader() ? <SimpleHeader /> : <Header />}
              <ColumnLayout>
                <Content>
                  <Container>
                    <ErrorBoundary FallbackComponent={ErrorComponent}>
                      <Routes {...props} />
                    </ErrorBoundary>
                  </Container>
                </Content>
              </ColumnLayout>
            </Wrapper>
          </Fragment>
        </ThemeProvider>
      </MuiThemeProvider>
    </Fragment>
  )
}

export default withAnalytics(withRouter(App))
