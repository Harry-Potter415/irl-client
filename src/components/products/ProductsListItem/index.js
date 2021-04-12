import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardMedia, CardActionArea, Title } from 'components/layout/GridItemCard'
import Typography from '@material-ui/core/Typography'
import { truncate } from 'helpers/utils'
import { listItemImage } from 'helpers/cloudinary'
import styled from 'styled-components'
import { ListItemLink } from 'components/layout/ListItemLink'

const ImageWithGradient = styled(CardMedia)`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 65px;
    opacity: 0.5;
    background-image: linear-gradient(to bottom, #000000, rgba(55, 46, 46, 0));
  }
`

class ProductsListItem extends Component {
  renderListItem = () => {
    const { product } = this.props
    return (
      <CardActionArea>
        <ImageWithGradient
          style={{ height: 200 }}
          image={listItemImage(product.imageUrl)}
          title={product.title}
        />
        <CardContent>
          <Title variant="body2">{product.title}</Title>
          <Typography component="p">{truncate(product.description, 70)}</Typography>
        </CardContent>
      </CardActionArea>
    )
  }

  render() {
    const {
      product: { shopHandle },
      link,
      hasLink,
    } = this.props
    return (
      <Card>
        {hasLink && shopHandle ? (
          <ListItemLink to={link || `/shop/products/${shopHandle}`}>
            {this.renderListItem()}
          </ListItemLink>
        ) : (
          this.renderListItem()
        )}
      </Card>
    )
  }
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired,
  link: PropTypes.string,
  hasLink: PropTypes.bool,
}

ProductsListItem.defaultProps = {
  hasLink: true,
}

export default ProductsListItem
