import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardActionArea, Title } from 'components/layout/GridItemCard'
import styled from 'styled-components'
import { listItemImage } from 'helpers/cloudinary'
import CampaignStatusDot from 'components/campaigns/CampaignStatusDot'
import { ListItemLink } from 'components/layout/ListItemLink'
import { campaignPeriod } from 'helpers/campaign'
import { CardContent as MuiCardContent } from '@material-ui/core/index'

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
    background-image: linear-gradient(#000000 0px, rgba(55, 46, 46, 0) 50px);
  }
`

const Dot = styled.div`
  position: absolute;
  top: 20px;
  z-index: 99999999999;
  right: 10px;
  display: block;
`
const Date = styled.p`
  margin: 4px 0;
  color: #464646;
  height: 17px;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.14px;
  line-height: 17px;
`

export const CardContent = styled(MuiCardContent)`
  &.MuiCardContent-root {
    padding: 0;
    height: 60px;
  }
`

class CampaignsListItem extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    let { campaign } = this.props

    return (
      <Card>
        <CardActionArea>
          <ListItemLink to={`/placements/${campaign.id}`}>
            <Dot>
              <CampaignStatusDot campaign={campaign} />
            </Dot>
            <ImageWithGradient
              style={{ height: 200 }}
              image={listItemImage(campaign.imageUrl)}
              title={campaign.title}
            />
          </ListItemLink>
          <ListItemLink to={`/placements/${campaign.id}`}>
            <CardContent>
              <Title variant="body2">{campaign.title}</Title>
              <Date>{campaignPeriod(campaign)}</Date>
            </CardContent>
          </ListItemLink>
        </CardActionArea>
      </Card>
    )
  }
}

CampaignsListItem.propTypes = {
  campaign: PropTypes.object.isRequired,
}

export default CampaignsListItem
