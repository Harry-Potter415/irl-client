import styled from 'styled-components'

export const PriceContainer = styled.div`
  margin-top: 10px;
`
export const BrandName = styled.div`
  font-size: ${props => (props.isSmall ? 11 : 16)}px;
  letter-spacing: ${props => (props.isSmall ? 0.11 : 0.16)}px;
  margin-bottom: ${props => (props.isSmall ? 0 : 3)}px;
  text-transform: uppercase;
`
