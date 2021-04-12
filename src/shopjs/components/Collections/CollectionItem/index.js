import React from 'react'
import { makeStyles, Card, CardActionArea, Typography } from '@material-ui/core'
import { useCollection } from 'shopjs/hooks'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const StyledBox = styled('div')`
  padding: 30px;
  background-color: white !important;
  z-index: 999;
  opacity: 0.95;
  text-align: center;
`

const CollectionImage = styled('div')`
  ${({ image }) => `background: url(${image}) center center no-repeat`};
  background-size: cover;
  height: 280px;
  width: 100%;
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
`

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
})

const CollectionItem = ({ history, image, title, collectionHandle }) => {
  const classes = useStyles()

  const { collection } = useCollection({ collectionHandle })

  const handleClick = () => {
    history.push(`/shop/collections/${collectionHandle}`)
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea onClick={handleClick}>
        <CollectionImage image={collection.image ? collection.image : null}>
          <StyledBox>
            <Typography variant="subtitle1">{collection.title}</Typography>
          </StyledBox>
        </CollectionImage>
      </CardActionArea>
    </Card>
  )
}

export default withRouter(CollectionItem)
