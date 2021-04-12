import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import get from 'lodash/get'
import CurrencyInput from 'components/inputs/CurrencyInput'
import TextInput from 'components/inputs/TextInput'
import MultipleImageUploader from 'components/images/MultipleImageUploader'
import AdminUploader from 'components/admin/AdminUploader'
import styled from 'styled-components'

const StyledPaper = ({ children, style }) => {
  return (
    <Paper variant="outlined" elevation={2} style={{ padding: 20, ...style }}>
      {children}
    </Paper>
  )
}

const StyledLink = styled(Link)`
  cursor: pointer;
  &:hover {
    color: inherit;
  }
`

const NewVariant = ({
  variantNumber,
  product,
  handleChange,
  errors,
  option,
  uploaderId,
  setNumberOfVariants,
  numberOfVariants,
  toggleMultipleVariants,
}) => {
  return (
    <Fragment>
      <Grid container justify="flex-end" style={{ marginTop: 20 }}>
        <Grid item style={{ marginRight: 20 }}>
          <StyledLink
            color="secondary"
            underline="always"
            onClick={
              numberOfVariants === 1
                ? toggleMultipleVariants
                : () => setNumberOfVariants(numberOfVariants - 1)
            }
          >
            Remove Variant
          </StyledLink>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <StyledPaper style={{ paddingBottom: 50 }}>
          <label forhtml="title2">
            Variant {variantNumber} {option}
          </label>
          <TextInput
            label=""
            placeholder={option}
            name={`variantTitle${variantNumber}`}
            value={get(product, `variantTitle${variantNumber}`)}
            handleChange={handleChange}
            error={get(errors, `variantTitle${variantNumber}`)}
          />
          <Grid container justify-content="space-around" spacing={5}>
            <Grid item xs={6}>
              <label forhtml="pricePerUnit">Price per Unit</label>
              <CurrencyInput
                name={`pricePerUnit${variantNumber}`}
                placeholder="0.00"
                value={get(product, `pricePerUnit${variantNumber}`)}
                handleChange={handleChange}
                error={get(errors, `pricePerUnit${variantNumber}`)}
              />
            </Grid>
            <Grid item xs={6}>
              <label forhtml="retailPrice">Retail Price per Unit</label>
              <CurrencyInput
                name={`retailPrice${variantNumber}`}
                placeholder="0.00"
                value={get(product, `retailPrice${variantNumber}`)}
                handleChange={handleChange}
                error={get(errors, `retailPrice${variantNumber}`)}
              />
            </Grid>
          </Grid>
          <Grid container justify-content="space-around" spacing={5}>
            <Grid item xs={6}>
              <label forhtml="quantity">Quantity Available</label>
              <TextInput
                label=""
                placeholder="1000"
                name={`quantity${variantNumber}`}
                value={get(product, `quantity${variantNumber}`)}
                error={get(errors, `quantity${variantNumber}`)}
                handleChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <label forhtml="unitsPerCarton">Units per Case</label>
              <TextInput
                label=""
                placeholder="12"
                name={`unitsPerCarton${variantNumber}`}
                value={get(product, `unitsPerCarton${variantNumber}`)}
                error={get(errors, `unitsPerCarton${variantNumber}`)}
                handleChange={handleChange}
                type="number"
              />
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
      <Grid item xs={6}>
        <StyledPaper>
          <AdminUploader label={`Variant ${variantNumber} Image`}>
            <MultipleImageUploader
              images={get(product, `images${variantNumber}`)}
              folder="products"
              id={uploaderId}
              onImageUpload={e => {
                handleChange(e, { imageUploader: true, field: `images${variantNumber}` })
              }}
            />
          </AdminUploader>
        </StyledPaper>
      </Grid>
    </Fragment>
  )
}

export default NewVariant
