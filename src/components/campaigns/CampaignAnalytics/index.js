import React, { Component, Fragment } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import styled from 'styled-components'
import DetailsGridSection from 'components/details/DetailsGridSection'
import Rating from 'components/inputs/Rating'

const ReviewsCard = styled(Card)`
  margin-top: 2rem;
`
const OverviewCardContent = styled(CardContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h5 {
    margin-bottom: 0.5rem;
  }
`
const Details = styled(Typography)`
  color: ${props => props.theme.palette.text.primary} !important;
`
const Reviews = styled.div`
  display: flex;
  align-items: center;
  margin-left: -12px;
`
const ReviewsNumber = styled(Typography)`
  font-weight: bold !important;
`
const Analytics = styled.div`
  min-height: 345px;
`

class CampaignAnalytics extends Component {
  render() {
    const { campaignAnalytics } = this.props

    return (
      <Analytics>
        {campaignAnalytics && (
          <Fragment>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <ReviewsCard>
                  <CardContent>
                    <Typography variant="h4">Reviews</Typography>
                    <Reviews>
                      <Rating value={campaignAnalytics.averageReviewsRate} readOnly={true} />
                      <ReviewsNumber variant="body1">
                        ({campaignAnalytics.reviewsCount} Reviews)
                      </ReviewsNumber>
                    </Reviews>
                  </CardContent>
                </ReviewsCard>
              </Grid>
            </Grid>
            <DetailsGridSection header={'Placement Overview'}>
              <Grid item md={4}>
                <Card>
                  <OverviewCardContent>
                    <Typography variant="h5">{campaignAnalytics.validatedUnits}</Typography>
                    <Details variant="caption" gutterBottom>
                      Units
                    </Details>
                  </OverviewCardContent>
                </Card>
              </Grid>
              <Grid item md={4}>
                <Card>
                  <OverviewCardContent>
                    <Typography variant="h5">{campaignAnalytics.propertiesCount}</Typography>
                    <Details variant="caption" gutterBottom>
                      Unique Properties
                    </Details>
                  </OverviewCardContent>
                </Card>
              </Grid>
              <Grid item md={4}>
                <Card>
                  <OverviewCardContent>
                    <Typography variant="h5">{campaignAnalytics.totalClicks}</Typography>
                    <Details variant="caption" gutterBottom>
                      QR Scans
                    </Details>
                  </OverviewCardContent>
                </Card>
              </Grid>
            </DetailsGridSection>
          </Fragment>
        )}
      </Analytics>
    )
  }
}

export default CampaignAnalytics
