import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import { PRIMARY_GREEN } from 'lib/colors'
import ProductIcon from 'icons/ProductIcon'
import PropertyIcon from 'icons/PropertyIcon'

const IconWrapper = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  transform: scale(1.5);
  margin-top: 1.5rem;
`

const OptionCard = styled(CardContent)`
  width: 220px;
  height: 160px;
  &.selected {
    background: ${PRIMARY_GREEN};
    p,
    path {
      color: #ffffff;
    }
  }
`

const optionIcons = {
  brand: ProductIcon,
  host: PropertyIcon,
  short_term_rental: PropertyIcon,
  coworking_space: ProductIcon,
  fitness_center: ProductIcon,
  hotel: PropertyIcon,
  other: ProductIcon,
}

class Option extends Component {
  render() {
    const { field, option, isSelected, onSelect } = this.props

    const Icon = optionIcons[option.value] || PropertyIcon

    return (
      <Grid item>
        <Card onClick={() => onSelect(field, option)}>
          <CardActionArea>
            <OptionCard className={isSelected ? 'selected' : null}>
              <Typography variant="body2" align="center">
                {option.title}
              </Typography>
              <IconWrapper>
                <Icon fontSize="large" color="disabled" viewBox="0 0 20 20" />
              </IconWrapper>
            </OptionCard>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export default Option
