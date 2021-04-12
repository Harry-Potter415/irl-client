import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import DatePickerInput from 'components/inputs/DatePickerInput'
import { loadMyProductsOptions, buildProductsOption } from 'helpers/react-select'
import FormHeader from 'components/layout/FormHeader'
import SectionTitle from 'components/layout/FormSectionTitle'
import FormContainer from 'components/layout/FormContainer'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const MissingProductText = styled(Typography)`
  text-transform: none !important;
  letter-spacing: 0 !important;
  display: inline-block !important;
  &.new-product-link {
    color: ${props => props.theme.palette.primary.main};
    margin-left: 0.2rem;
  }
`

class StepOne extends Component {
  render() {
    let { campaign, handleChange, errors, subtitle } = this.props
    return (
      <FormContainer>
        <FormHeader subtitle={subtitle} title="Placement Details" />
        <ReactSelect
          defaultValue={buildProductsOption(campaign.products)}
          hasValue={Boolean(campaign.productIds)}
          label="Select Products*"
          name="productIds"
          loadOptions={loadMyProductsOptions}
          isMulti={true}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'productIds', isMulti: true })
          }}
          error={errors.productIds}
        />
        <MissingProductText variant="caption" gutterBottom>
          Don't see the product you're looking for?
        </MissingProductText>
        <Link to="/products/new" target="_blank">
          <MissingProductText className="new-product-link" variant="caption" gutterBottom>
            Add New Product
          </MissingProductText>
        </Link>
        <SectionTitle text="Placement Details" />
        <TextInput
          label="Placement*"
          placeholder="Extra Energy Drink Summer burst"
          name="title"
          value={campaign.title}
          handleChange={handleChange}
          error={errors.title}
        />
        <TextInput
          label="Overview*"
          placeholder="Delight your guests with the delicious and refreshing fruits of our Berry energy drink. Perfect way to beat the jetlag after a long flight or simply a natural pick-me-up."
          name="description"
          value={campaign.description}
          multiline
          rows="4"
          handleChange={handleChange}
          error={errors.description}
        />
        <TextInput
          label="Promo Code*"
          placeholder="Please ensure this is live"
          name="promoCode"
          value={campaign.promoCode}
          multiline={true}
          handleChange={handleChange}
          error={errors.promoCode}
        />
        <TextInput
          label="Quantity*"
          name="quantity"
          value={campaign.quantity}
          handleChange={handleChange}
          error={errors.quantity}
          type="number"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePickerInput
              value={campaign.startDate}
              handleChange={e => {
                handleChange(e, { datePickerSelect: true, field: 'startDate' })
              }}
              placeholder="Start Date*"
              error={errors.startDate}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePickerInput
              value={campaign.endDate}
              handleChange={e => {
                handleChange(e, { datePickerSelect: true, field: 'endDate' })
              }}
              placeholder="End Date"
              error={errors.endDate}
            />
          </Grid>
        </Grid>
      </FormContainer>
    )
  }
}

StepOne.propTypes = {
  campaign: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default StepOne
