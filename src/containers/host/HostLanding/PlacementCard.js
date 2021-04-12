import React from 'react'
import { listItemImage } from 'helpers/cloudinary'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { campaignPeriod } from 'helpers/campaign'
import { Card, CardContent, CardActionArea } from 'components/layout/GridItemCard'
import { ListItemLink } from 'components/layout/ListItemLink'

const Image = styled.img`
  max-width: 100%;
  height: auto;
`
const Title = styled(Typography)`
  && {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    font-weight: 700;
  }
`

const PlacementCard = props => {
  const { campaign } = props
  return (
    <Card>
      <CardActionArea>
        <ListItemLink to={`/placements/${campaign.id}`}>
          <Image src={listItemImage(campaign.imageUrl)} alt="placement" />
        </ListItemLink>
        <ListItemLink to={`/placements/${campaign.id}`}>
          <CardContent>
            <Title variant="body2">{campaign.title}</Title>
            <Typography>{campaignPeriod(campaign, 'MMM D')}</Typography>
          </CardContent>
        </ListItemLink>
      </CardActionArea>
    </Card>
  )
}

PlacementCard.propTypes = {
  campaign: PropTypes.object,
}

export default PlacementCard
