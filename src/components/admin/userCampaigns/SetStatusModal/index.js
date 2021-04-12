import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserCampaign } from 'actions/admin/userCampaigns'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import SelectInput from 'components/inputs/SelectInput'
import TextInput from 'components/inputs/TextInput'
import {
  USER_CAMPAIGN_DISPLAY_STATUSES,
  userCampaignStatusTranslationDisplayToAction,
} from 'lib/constants'

function SetStatusModal({ onClose, userCampaign = {}, updateUserCampaign, isOpen }) {
  const [status, setStatus] = useState(userCampaign.status)
  useEffect(() => {
    setStatus(userCampaign.status)
  }, [userCampaign.status])

  const [quantity, setQuantity] = useState(userCampaign.quantity)
  useEffect(() => {
    setQuantity(userCampaign.quantity)
  }, [userCampaign.quantity])

  const [errorQuantity, setErrorQuantity] = useState()

  return (
    <Dialog maxWidth="xs" aria-labelledby="confirmation-dialog-title" open={isOpen}>
      <DialogTitle id="confirmation-dialog-title">
        Placement at {userCampaign.user.name}
      </DialogTitle>
      <DialogContent>
        <TextInput
          name="quantity"
          label="Quantity"
          value={quantity}
          handleChange={({ target: { value } }) => {
            if (value < 0) {
              setQuantity(0)
            } else {
              setQuantity(value)
              if (value > userCampaign.campaign.quantity) {
                setErrorQuantity("Warning: exceeds placement's total")
              } else {
                setErrorQuantity(null)
              }
            }
          }}
          error={errorQuantity}
          type="number"
          disabled={status !== 'accepted'}
        />
        <SelectInput
          name="status"
          label="Status"
          options={USER_CAMPAIGN_DISPLAY_STATUSES}
          value={status}
          handleChange={({ target: { value } }) => {
            setStatus(value)
            // discard all changes to quantity, if status is different then accepted
            if (value !== 'accepted') {
              setQuantity(userCampaign.quantity)
              if (status) {
                setErrorQuantity(null)
              }
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            updateUserCampaign(userCampaign.id, {
              status: userCampaignStatusTranslationDisplayToAction[status],
              ...(status === 'accepted' ? { quantity } : {}),
            })
            onClose()
          }}
          disabled={!!errorQuantity}
          color="primary"
        >
          Update
        </Button>
        <Button
          onClick={() => {
            onClose()
            setStatus(userCampaign.status)
          }}
          color="cancel"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SetStatusModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  userCampaign: PropTypes.object.isRequired,
  updateUserCampaign: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserCampaign,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetStatusModal)
