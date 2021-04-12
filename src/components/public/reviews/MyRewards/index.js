import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import TabbedPage from 'components/layout/TabbedPage'
import TabContent from 'components/layout/TabContent'
import { Title } from 'components/layout/GridItemCard'
import { uploaderImage } from 'helpers/cloudinary'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Rating from 'components/inputs/Rating'
import Reward from 'components/public/reviews/Reward'

const TABS = {
  myReviews: 0,
  myRewards: 1,
}

const Container = styled(Grid)`
  .tabs-container {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    position: absolute;
    left: 0;
    right: 0;
    padding-left: 30px;
    background-color: #fff;
  }
  .tab-item {
    margin-right: 2rem;
  }
`
const Content = styled(Grid)`
  && {
    margin-top: 4rem;
  }
`
const Item = styled(Grid)`
  && {
    margin-bottom: 2rem;
  }
`
const ImageContainer = styled.div`
  position: relative;
`
const Company = styled(Typography)`
  && {
    color: #fff;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`
const Image = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
  @media (max-width: 960px) {
    min-height: auto;
  }
`
const StyledTitle = styled(Title)`
  margin-top: 1rem !important;
`

class MyRewards extends Component {
  state = {
    activeTab: TABS.myReviews,
  }

  handleTabChange = tab => {
    this.setState({ activeTab: tab })
  }

  isReviewed = product => {
    const { reviews } = this.props
    return reviews[product.id] !== 'skipped'
  }

  render() {
    const { activeTab } = this.state
    const { user, reviews } = this.props
    const { receivedProducts } = user
    return (
      <Container container>
        <TabbedPage centered={true} activeTab={activeTab} handleTabChange={this.handleTabChange}>
          <TabContent title="My Reviews">
            <Content container spacing={4}>
              {Object.values(reviews).map(review => {
                if (review === 'skipped') return null
                const product = receivedProducts.find(product => product.id === review.productId)
                return (
                  <Item item key={review.id} md={4} lg={3}>
                    <ImageContainer>
                      <Company variant="h5">{user.company}</Company>
                      <Image src={uploaderImage(product.imageUrl)} />
                    </ImageContainer>
                    <StyledTitle variant="h5">{product.title}</StyledTitle>
                    <Rating value={review.rating} readOnly={true} />
                  </Item>
                )
              })}
            </Content>
          </TabContent>
          <TabContent title="My Rewards">
            <Content container spacing={4}>
              {receivedProducts.map(product => {
                if (!this.isReviewed(product)) return null
                return (
                  <Item item key={product.id} md={4} lg={3}>
                    <ImageContainer>
                      <Company variant="h5">{user.company}</Company>
                      <Image src={uploaderImage(product.imageUrl)} />
                    </ImageContainer>
                    <StyledTitle variant="h5">{product.title}</StyledTitle>
                    <Typography component="p">{product.description}</Typography>
                    {product.promoTitle && product.promoCode && <Reward product={product} />}
                  </Item>
                )
              })}
            </Content>
          </TabContent>
        </TabbedPage>
      </Container>
    )
  }
}

export default MyRewards
