import React, { Fragment, useEffect, useState } from 'react'
import Billboard from 'assets/images/hosts/billboard.jpeg'
import ExplorePlacements from 'assets/images/hosts/explore_placements.jpg'
import ExploreShop from 'assets/images/hosts/explore_shop.jpg'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { withAlerts } from '../../../hocs/withAlerts'
import { Typography, Grid, Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import PlacementCard from './PlacementCard'
import { selectAvailableCampaigns } from 'selectors/campaigns'
import { getAvailableCampaigns } from 'actions/campaigns'
import { Slide } from 'pure-react-carousel'
import PropTypes from 'prop-types'
import Carousel from 'components/layout/Carousel'
import { theme } from 'components/theme'
import { fetchProductsSearch } from 'shopjs/services/Shopify/buy'
import { ProductItem } from 'shopjs/components'
import CollectionList from 'components/collections/CollectionList'

const Header = styled.div`
  margin: -30px -30px 2rem;
  img {
    width: 100%;
  }
`
const Explore = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 4rem;
  ${theme.breakpoints.down('xs')} {
    flex-direction: column;
  }
`
const ExploreCard = styled(Card)`
  && {
    width: 280px;
    height: 70px;
    margin-right: 2rem;
    cursor: pointer;
    ${theme.breakpoints.down('xs')} {
      margin-bottom: 1.5rem;
    }
  }
`
const ExploreText = styled(Typography)`
  && {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
  }
`
const ExploreCardContent = styled(CardContent)`
  && {
    display: flex;
    align-items: center;
    padding: 0;
    p {
      margin: 0 20px;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
`

const HostLanding = props => {
  const { history, availableCampaigns, getAvailableCampaigns } = props
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAvailableCampaigns()
  }, [getAvailableCampaigns])

  useEffect(() => {
    const query = { facetFilters: ['handle:snacks'] }
    fetchProductsSearch({ query })
      .then(products => {
        setProducts(products)
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Header>
            <img src={Billboard} alt="living room" />
          </Header>
          <Typography variant="h5">Explore Extra</Typography>
          <Explore>
            <ExploreCard onClick={() => history.push('/placements')}>
              <ExploreCardContent>
                <img src={ExplorePlacements} alt="products" />
                <ExploreText variant="body1">Placements</ExploreText>
              </ExploreCardContent>
            </ExploreCard>
            <ExploreCard onClick={() => history.push('/shop')}>
              <ExploreCardContent>
                <img src={ExploreShop} alt="products" />
                <ExploreText variant="body1">Shop</ExploreText>
              </ExploreCardContent>
            </ExploreCard>
          </Explore>
          <Carousel
            title="Products by Extra"
            text="Find and purchase products to offer at your property"
            link="/shop/search"
            naturalSlideWidth={185}
            naturalSlideHeight={335}
            totalSlides={products.length}
          >
            {products.map((product, index) => {
              return (
                <div key={`products-${index}`}>
                  <Slide index={index}>
                    <ProductItem product={product} />
                  </Slide>
                </div>
              )
            })}
          </Carousel>
          <Carousel
            title="Placements by Extra"
            text="Discover new brands offering free product placements for your guests"
            link="/placements"
            naturalSlideWidth={300}
            naturalSlideHeight={280}
            totalSlides={availableCampaigns.length}
          >
            {availableCampaigns.map((campaign, index) => {
              return (
                <div key={`campaigns-${index}`}>
                  <Slide index={index} key={`campaigns-${index}`}>
                    <PlacementCard campaign={campaign} />
                  </Slide>
                </div>
              )
            })}
          </Carousel>
        </Grid>
      </Grid>
      <CollectionList />
    </Fragment>
  )
}

HostLanding.propTypes = {
  history: PropTypes.object,
  availableCampaigns: PropTypes.array,
  products: PropTypes.array,
  getAvailableCampaigns: PropTypes.func,
  getProducts: PropTypes.func,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAvailableCampaigns,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { availableCampaigns } = selectAvailableCampaigns(state)
  return {
    availableCampaigns,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(HostLanding)))
