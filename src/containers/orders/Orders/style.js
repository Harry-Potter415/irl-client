import styled from 'styled-components'
import { theme } from 'components/theme'

export const TitleWrapper = styled.div`
  margin-bottom: 20px;
`
export const OrdersTable = styled.div`
  && {
    .MuiTableCell-head {
      color: ${theme.palette.text.primary};
      padding-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.palette.grey[300]};
    }
    .MuiTableCell-body {
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
`
export const OrderTypeTabs = styled.div`
  .MuiTab-wrapper {
    font-size: 14px;
  }
`
