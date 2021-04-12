import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Input } from '@material-ui/icons'
import copy from 'copy-to-clipboard'
import { withAlerts } from 'hocs/withAlerts'

const CodeContainer = styled.div`
  background: ${props => props.theme.palette.grey[100]};
  border: 1px solid ${props => props.theme.palette.grey[350]};
  padding: 27px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DiscountTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.primary} !important;
  font-size: 0.7rem !important;
`
const StoreLink = styled(Input)`
  color: ${props => props.theme.palette.primary.main};
`
const Title = styled(Typography)`
  && {
    margin: 1rem 0;
  }
`
const Code = styled.p`
  cursor: pointer;
`

class Reward extends Component {
  clickCode = () => {
    const { campaign, showAlertSuccess } = this.props
    copy(campaign.promoCode)
    showAlertSuccess('Promo code copied to clipboard')
  }

  render() {
    const { product } = this.props
    return (
      <div>
        <Title variant="h7" component="p" align="center">
          {product.promoTitle}
        </Title>
        <CodeContainer>
          <div>
            <DiscountTitle variant="caption" gutterBottom>
              Discount code
            </DiscountTitle>
            <Code onClick={this.clickCode}>{product.promoCode}</Code>
          </div>
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            <StoreLink />
          </a>
        </CodeContainer>
      </div>
    )
  }
}

export default withAlerts(Reward)
