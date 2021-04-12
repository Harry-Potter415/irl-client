import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CardActions, Divider, Grid } from '@material-ui/core'

import ReviewIcon from 'icons/ReviewIcon'
import ProductIcon from 'icons/ProductIcon'
import ShippingIcon from 'icons/ShippingIcon'
import PictureIcon from 'icons/PictureIcon'
import CheckIcon from 'icons/CheckIcon'

const statusSequence = ['reviewing', 'processing', 'shipped', 'delivered', 'finished']

const statusIcons = [ReviewIcon, ProductIcon, ShippingIcon, PictureIcon]

const IconWrapper = styled.span`
  display: inline-block;
  margin: 0 17px !important;
  position: relative;
  overflow: visible !important;
  &:not(:last-child):after {
    content: '';
    background-color: #e1e1e1;
    display: inline-block;
    height: 1px;
    width: 20px;
    position: absolute;
    top: 45%;
    right: -28px;
  }
`

class StatusIcons extends Component {
  render() {
    const { status, action } = this.props
    const statusIndex = statusSequence.indexOf(status)
    const icons = []

    statusIcons.forEach((Icon, index) => {
      if (index === statusIndex) {
        icons.push(
          <IconWrapper>
            <Icon key={index} fontSize="large" variant="outline" color="primary" />
          </IconWrapper>
        )
      } else if (index > statusIndex) {
        icons.push(
          <IconWrapper>
            <Icon key={index} fontSize="large" color="disabled" variant="outline" />
          </IconWrapper>
        )
      } else {
        icons.push(
          <IconWrapper>
            <CheckIcon key={index} fontSize="large" color="primary" />
          </IconWrapper>
        )
      }
    })

    return (
      <>
        <Divider light />
        <CardActions>
          <Grid container spacing={0} alignItems="center" justify="space-between">
            <Grid item>{icons}</Grid>
            <Grid item>{action}</Grid>
          </Grid>
        </CardActions>
      </>
    )
  }
}

StatusIcons.propTypes = {
  campaign: PropTypes.object,
}

export default StatusIcons
