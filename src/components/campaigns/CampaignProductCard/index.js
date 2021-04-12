import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Rating from 'components/inputs/Rating'

const Container = styled.div`
  background: ${props => props.theme.palette.grey[100]};
  border: 1px solid ${props => props.theme.palette.grey[350]};
  padding: 27px 24px;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    width: calc(100% + 40px);
    margin-left: -20px;
    border-left: none;
    border-right: none;
  }
`
const Title = styled(Typography)`
  margin: 1rem 0 !important;
`
const Description = styled(Typography)`
  white-space: pre-wrap;
`

class CampaignProductCard extends Component {
  render() {
    const { campaign, review, onRatingChange, ratingError } = this.props
    const { user, products } = campaign

    return (
      <Fragment>
        {products.map(product => {
          return (
            <Container>
              <Typography variant="caption">{user.company}</Typography>
              <Title variant="h5">{product.title}</Title>
              <Description variant="body1">{product.description}</Description>
              {review && (
                <Fragment>
                  <Rating onChange={onRatingChange} />
                  <Typography color="error" variant="caption" gutterBottom>
                    {ratingError}
                  </Typography>
                </Fragment>
              )}
            </Container>
          )
        })}
      </Fragment>
    )
  }
}

export default CampaignProductCard
