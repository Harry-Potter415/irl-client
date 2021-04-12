import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon, Typography, Grid } from '@material-ui/core'

const LeftColumn = styled(Grid)`
  width: 50px;
  flex: 0 0;
`

const RightColumn = styled(Grid)`
  width: auto;
  flex: 1 0;
  padding-left: 10px;
  margin-bottom: 1rem;
`

class DetailsListItem extends Component {
  render() {
    const { label, value } = this.props
    const icon = this.props.icon || 'image'
    const iconColor = this.props.iconColor || 'disabled'
    const isCustom =
      ['disabled', 'action', 'primary', 'secondary', 'error', 'inherit'].indexOf(iconColor) < 0

    const DetailsIcon = isCustom
      ? styled(Icon)`
          color: ${iconColor};
        `
      : Icon

    return (
      <Grid container spacing={1} className="details-list-item">
        <LeftColumn>
          <DetailsIcon fontSize="large" color={isCustom ? 'inherit' : iconColor}>
            {icon}
          </DetailsIcon>
        </LeftColumn>
        <RightColumn>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          <Typography variant="body1" gutterBottom component={'span'}>
            {value}
          </Typography>
        </RightColumn>
      </Grid>
    )
  }
}

export default DetailsListItem
