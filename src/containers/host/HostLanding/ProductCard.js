import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography, LinearProgress } from '@material-ui/core'
import { Card, CardContent, CardActionArea } from 'components/layout/GridItemCard'
import { ListItemLink } from 'components/layout/ListItemLink'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { RED } from 'lib/colors'
import { listItemImage } from 'helpers/cloudinary'
import SectionTitle from 'components/layout/FormSectionTitle'
import { theme } from 'components/theme'
import { round } from 'lodash'

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`
const Image = styled.img`
  max-width: 100%;
`
const Brand = styled(SectionTitle)`
  && {
    margin-top: 0.5rem;
    margin-bottom: 0;
    display: inline-block;
  }
`
const Title = styled(Typography)`
  && {
    margin: 0.25rem 0;
    font-weight: 700;
  }
`
const Price = styled.div`
  display: flex;
`
const Reviews = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  margin-top: 0.25rem;
`
const Rating = styled.div`
  display: flex;
  align-items: center;
`
const StyledFavoriteIcon = styled(FavoriteIcon)`
  && {
    color: ${RED};
    font-size: 1.2rem;
    margin-right: 0.25rem;
  }
`
const StyledLinearProgress = styled(LinearProgress)`
  && {
    width: 150px;
    margin-left: 25px;
    height: 7px;
    border-radius: 3.5px;
    background-color: ${theme.palette.grey['300']};
    .MuiLinearProgress-bar {
      background-color: ${RED};
    }
  }
`

const ProductCard = props => {
  const { product } = props
  const rating = round((parseFloat(product.averageRating) / 5) * 100, 2)
  let ratingWord = ''
  if (rating > 0) ratingWord = 'Poor'
  if (rating >= 25) ratingWord = 'Average'
  if (rating >= 50) ratingWord = 'Good'
  if (rating >= 75) ratingWord = 'Excellent'

  return (
    <Card>
      <CardActionArea>
        <ListItemLink to={`/products/${product.id}`}>
          <ImageContainer>
            <Image src={listItemImage(product.imageUrl)} alt="product" />
          </ImageContainer>
        </ListItemLink>
        <ListItemLink to={`/products/${product.id}`}>
          <CardContent>
            <Brand text={product.brand} />
            <Title variant="body2">{product.title}</Title>
            <Price>
              <Typography variant="body1">{product.promoDescription}</Typography>
            </Price>
            <Reviews>
              <Rating>
                <StyledFavoriteIcon />
                <Typography variant="body1">{ratingWord}</Typography>
              </Rating>
              <Typography variant="body1">{rating}%</Typography>
            </Reviews>
            <StyledLinearProgress variant="determinate" value={rating} />
          </CardContent>
        </ListItemLink>
      </CardActionArea>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object,
}

export default ProductCard
