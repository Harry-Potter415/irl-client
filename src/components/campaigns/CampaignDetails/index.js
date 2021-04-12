import React, { Component, Fragment } from 'react'
import pluralize from 'pluralize'
import DetailsListItem from 'components/details/DetailsListItem'
import DetailsGridSection from 'components/details/DetailsGridSection'
import DetailsGridCard from 'components/details/DetailsGridCard'
import GradeIcon from '@material-ui/icons/Grade'
import EventIcon from '@material-ui/icons/Event'
import PlaceIcon from '@material-ui/icons/Place'
import StoreIcon from '@material-ui/icons/Store'
import moment from 'moment'

class CampaignDetails extends Component {
  render() {
    const { campaign } = this.props

    const dos = campaign.permittedRules
      ? campaign.permittedRules.map((rule, index) => (
          <DetailsListItem key={index} label={rule} icon="done" iconColor="#008000" />
        ))
      : []

    const donts = campaign.forbiddenRules
      ? campaign.forbiddenRules.map((rule, index) => (
          <DetailsListItem key={index} label={rule} icon="clear" iconColor="error" />
        ))
      : []

    return (
      <Fragment>
        <DetailsGridSection header={'Placement Details'}>
          <DetailsGridCard
            size={4}
            style={{
              minHeight: '300px',
            }}
            header={'Products'}
          >
            <DetailsListItem
              icon={<GradeIcon />}
              label="Brand Name"
              value={campaign.user.company}
            />
            <DetailsListItem
              icon={<StoreIcon />}
              label="Total quantity"
              value={campaign.quantity}
            />
            <DetailsListItem
              icon={<StoreIcon />}
              label="Remaining quantity"
              value={campaign.quantityRemaining}
            />
          </DetailsGridCard>
          <DetailsGridCard
            size={4}
            style={{
              minHeight: '300px',
            }}
            header={'Placement Dates'}
          >
            <DetailsListItem
              icon={<EventIcon />}
              label="Start Date"
              value={moment(campaign.startDate).format('MM/DD/YY')}
            />
            <DetailsListItem
              icon={<EventIcon />}
              label="End Date"
              value={moment(campaign.endDate).format('MM/DD/YY')}
            />
          </DetailsGridCard>
          <DetailsGridCard
            size={4}
            style={{
              minHeight: '300px',
            }}
            header={'Target Markets'}
          >
            <DetailsListItem
              icon={<PlaceIcon />}
              label={pluralize('Target Zone', campaign.cities.length)}
              value={
                <Fragment>
                  {campaign.cities.map((city, i) => (
                    <div key={i}>{city}</div>
                  ))}
                </Fragment>
              }
            />
          </DetailsGridCard>
        </DetailsGridSection>
        {!!(dos.length || donts.length) && (
          <DetailsGridSection header={'Placement Rules'}>
            {dos.length > 0 && (
              <DetailsGridCard size={6} header={"Placement do's"}>
                {dos}
              </DetailsGridCard>
            )}
            {donts.length > 0 && (
              <DetailsGridCard size={6} header={"Placement don'ts"}>
                {donts}
              </DetailsGridCard>
            )}
          </DetailsGridSection>
        )}
      </Fragment>
    )
  }
}

export default CampaignDetails
