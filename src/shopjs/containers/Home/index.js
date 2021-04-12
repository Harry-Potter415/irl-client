import React, { Fragment } from 'react'
import { Typography, Box } from '@material-ui/core'
import { CollectionCarousel, SearchBar } from 'shopjs/components'
import CollectionList from 'components/collections/CollectionList'
import HeroImage from 'components/layout/HeroImage'
import styled from 'styled-components'

const HeroText = styled(Typography)`
  color: white !important;
  text-align: center !important;
  margin: 40px auto 40px auto;
  font-size: 44px !important;
`

// FIXME: this is a temporary workaround: the whole app has a padding around the content and the
// final solution will probably remove it. Until then, we don't want to break other pages
const MarginAdjustWrapper = styled.div`
  margin: -31px;
  @media (max-width: 600px) {
    margin: -21px;
  }
  // margin: -31px -30px -30px -45px;
`

const Home = () => (
  <Fragment>
    <MarginAdjustWrapper>
      <HeroImage
        url="https://res.cloudinary.com/irl/image/upload/v1569409819/assets-images/shop_cover.png"
        useCloudinaryRelativeUrl={false}
      >
        <HeroText variant="h1">Explore our Shop</HeroText>
        <Box py={2}>
          <SearchBar />
        </Box>
      </HeroImage>
    </MarginAdjustWrapper>
    <Box p={2}>
      <Box my={2}>
        <Typography variant="h5">Discover our Collections</Typography>
        <Typography variant="subtitle1">
          We provide premium products for your rental property, Airbnb, co-working space, gym, and
          more—for less.
        </Typography>
      </Box>
    </Box>
    <Box p={1}>
      <CollectionList />
    </Box>
    <Box p={1}>
      <CollectionCarousel
        title="Shop Snacks"
        description="Delicious snacks and drinks to delight your guests!"
        collectionHandle="snacks"
      />
      <CollectionCarousel
        title="Shop Wellness"
        description="Wellness products to keep your guests looking and feeling great"
        collectionHandle="wellness"
      />
    </Box>
  </Fragment>
)

export default Home
