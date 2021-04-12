import React, { useState, Fragment, useContext } from 'react'
import { ShopifyContext } from 'shopjs/context'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withAlerts } from 'hocs/withAlerts'
import { selectCurrentUser } from 'selectors/auth'
import { applyToCampaign } from 'actions/campaigns'
import TextInput from 'components/inputs/TextInput'
import NumberInput from 'components/inputs/NumberInput'
import { Grid, FormControlLabel, FormGroup, Checkbox, Button } from '@material-ui/core'

const StatusCardNew = ({ campaign, applyToCampaign, currentUser, showAlertError }) => {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [rooms, setRooms] = useState(1)
  const [hasAgreedRules, setHasAgreedRules] = useState(false)
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false)
  const isUserStatusPending = currentUser.attributes.status === 'pending'

  const {
    cart: { addLineItem, handleOpenCart },
  } = useContext(ShopifyContext)

  const addToCart = async () => {
    const { shopifyId, shopifyHandle } = campaign
    if (quantity > 0) {
      handleOpenCart()
      return addLineItem(shopifyId, quantity, shopifyHandle)
    }
  }

  const apply = () => {
    addToCart()
      .then(checkout => {
        const { shopifyId } = campaign
        const lineItem = checkout.lineItems.find(lineItem => lineItem.variant.id === shopifyId)
        applyToCampaign(campaign.id, {
          description,
          quantity,
          rooms,
          checkoutId: checkout.id,
          lineItemId: lineItem.id,
        })
      })
      .catch(e => showAlertError(e.message))
  }

  const hasRules = campaign.permittedRules.length > 0 || campaign.forbiddenRules.length > 0

  const isCompleteForm =
    (!hasRules || hasAgreedRules) && description.length && hasAgreedTerms && quantity > 0
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item md={12}>
          <form>
            <FormGroup row>
              <NumberInput
                name="quantity"
                label="How many units would you like to order?"
                value={quantity}
                handleChange={setQuantity}
              />
            </FormGroup>
            <FormGroup row>
              <NumberInput
                name="rooms"
                label="How many rooms do you have?"
                value={rooms}
                handleChange={setRooms}
              />
            </FormGroup>
            <FormGroup row>
              <TextInput
                label="Why are you interested"
                placeholder="Tell us why you are interested in having this product at your property"
                value={description}
                handleChange={e => {
                  setDescription(e.target.value)
                }}
                multiline
                rows="4"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </FormGroup>
            <br />
            {hasRules && (
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasAgreedRules}
                      onChange={e => {
                        setHasAgreedRules(!hasAgreedRules)
                      }}
                      value="rules"
                      color="primary"
                    />
                  }
                  label={<span>I agree to the Placement Guidelines</span>}
                />
              </FormGroup>
            )}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasAgreedTerms}
                    onChange={e => {
                      setHasAgreedTerms(!hasAgreedTerms)
                    }}
                    value="rules"
                    color="primary"
                  />
                }
                label={<span>I agree to Terms and Conditions</span>}
              />
            </FormGroup>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="flex-start">
        <Grid item>
          <Button
            variant="contained"
            color={isCompleteForm ? 'primary' : 'secondary'}
            disabled={!isCompleteForm || isUserStatusPending}
            onClick={apply}
          >
            {isUserStatusPending ? 'Your account is being approved' : 'Add to Cart'}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}

StatusCardNew.propTypes = {
  campaign: PropTypes.object,
  currentUser: PropTypes.object,
  applyToCampaign: PropTypes.func,
}

const mapStateToProps = state => {
  const { router } = state
  return {
    router,
    currentUser: selectCurrentUser(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      applyToCampaign,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(StatusCardNew))
