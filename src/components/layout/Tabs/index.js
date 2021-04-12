import styled from 'styled-components'
import { Tabs } from '@material-ui/core'

export default styled(Tabs).attrs(() => ({
  indicatorColor: 'primary',
}))`
  background: white;
  color: rgba(0, 0, 0, 0.87);
`
