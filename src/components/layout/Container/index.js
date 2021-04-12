import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { globalStyles } from 'components/globalStyles'

export const Container = styled(Grid)`
  max-width: 1800px;
  width: 100%;
  padding: ${globalStyles.content.padding}px;
  position: relative;

  @media (max-width: 600px) {
    padding: ${globalStyles.content.mobilePadding}px;
    padding-top: 60px;
  }
`
