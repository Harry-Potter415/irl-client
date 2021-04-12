import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import { selectCurrentUser } from 'selectors/auth'
import { isAdmin } from 'helpers/user'
import CurrencyInput from 'components/inputs/CurrencyInput'
import ReactSelect from 'components/inputs/ReactSelect'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Link from '@material-ui/core/Link'
import Sync from 'react-select'
import Typography from '@material-ui/core/Typography'
import { loadAdminUserCompanyOptions, buildUserCompanyOption } from 'helpers/react-select'
import MultipleImageUploader from 'components/images/MultipleImageUploader'
import AdminUploader from 'components/admin/AdminUploader'
import { PRODUCT_TYPES } from 'lib/constants'
import Paper from '@material-ui/core/Paper'
import get from 'lodash/get'
import NewVariant from './NewVariant'
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

const ProductForm = ({ product, handleChange, errors, uploaderId, currentUser }) => {
  // this is necessary so that the userId validation doesn't fail for non-admins
  if (currentUser && !isAdmin(currentUser)) product.userId = currentUser.id

  const [multipleVariants, setMultipleVariants] = useState(false)
  const toggleMultipleVariants = () => setMultipleVariants(!multipleVariants)
  const [option, setOption] = useState('')
  const [numberOfVariants, setNumberOfVariants] = useState(0)

  product.numberOfVariants = numberOfVariants
  product.option = option
  product.multipleVariants = multipleVariants

  return (
    <Fragment>
      <Typography variant="h4">Add Product</Typography>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography variant="body1">
            Add your products here to be listed on the Extra Wholesale Shop.
          </Typography>
          <br />
          <Typography variant="body1">
            After submiting your product, our team will review it within 48 hours. For more
            opportunities to reach our premium network of hospitality partners, please speak to our
            team about Placement campaigns.
          </Typography>
          <StyledPaper style={{ marginTop: 10, marginBottom: 10 }}>
            <label forhtml="title">Product Title</label>
            <TextInput
              label=""
              placeholder="Title"
              name="title"
              value={product.title}
              handleChange={handleChange}
              error={errors.title}
            />
            <label forhtml="userId">Brand Name</label>
            {isAdmin(currentUser) && (
              <ReactSelect
                label=""
                defaultValue={buildUserCompanyOption(product.user)}
                hasValue={Boolean(product.userId)}
                placeholder="Brand Name"
                name="userId"
                loadOptions={loadAdminUserCompanyOptions}
                handleChange={e => {
                  handleChange(e, { reactSelect: true, field: 'userId' })
                }}
                error={errors.userId}
              />
            )}
            {currentUser && !isAdmin(currentUser) && (
              // This is only for displaying purposes. the name of this input
              // could be anything.
              <TextInput
                label=""
                name="userIdDisplay"
                value={currentUser && currentUser.attributes.company}
                disabled
                error={errors.userId}
                handleChange={handleChange}
              />
            )}
            <label forhtml="productType">Product Type</label>
            <ReactSelect
              onChange={handleChange}
              defaultValue={product.productType}
              hasValue={product.productType && product.productType.length > 0}
              label="Product Type"
              name="productType"
              options={PRODUCT_TYPES}
              SelectComponent={Sync}
              handleChange={e => {
                handleChange(e, { reactSelect: true, field: 'productType' })
              }}
              error={errors.productType}
            />
            <label forhtml="description">Description</label>
            <TextInput
              label=""
              placeholder="Organic natural energy drink brewed from the Guayusa leaf found almost exclusively in the Amazonian forests in Ecuador. Ingredients include carbonated water, organic Guayusa leaves, organic cane sugar & 150mg of natural caffeine. This game-changing drink provides sustained energy, mental clarity and focus, without feeling a crash."
              name="description"
              value={product.description}
              multiline
              rows="6"
              handleChange={handleChange}
              error={errors.description}
            />
          </StyledPaper>
          <label forhtml="url">Product URL</label>
          <TextInput
            label=""
            name="url"
            placeholder="www.yourwebsite.com/link-to-your-product"
            value={product.url}
            handleChange={handleChange}
            error={errors.url}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledPaper>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">Variants</Typography>
              </Grid>
              <Grid item style={{ paddingTop: 10, marginBottom: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={multipleVariants}
                      onChange={() => {
                        toggleMultipleVariants()
                        multipleVariants ? setNumberOfVariants(0) : setNumberOfVariants(1)
                      }}
                      value={multipleVariants}
                    />
                  }
                  label="This product has multiple options, like different sizes or colors. Scroll down and add multiple variants."
                />
                {multipleVariants && (
                  <Fragment>
                    <div style={{ marginTop: 10 }}>
                      <label forhtml="option">Option</label>
                    </div>
                    <TextInput
                      label=""
                      placeholder="Color / Size / etc"
                      name="option"
                      value={option}
                      handleChange={e => setOption(e.target.value)}
                      error={errors.option}
                    />
                  </Fragment>
                )}
              </Grid>
            </Grid>
          </StyledPaper>
          <StyledPaper style={{ marginTop: 20 }}>
            {multipleVariants && (
              <Fragment>
                <label forhtml="title2">Variant 1 {option}</label>
                <TextInput
                  label=""
                  placeholder={option}
                  name={`variantTitle1`}
                  value={get(product, `variantTitle1`)}
                  handleChange={handleChange}
                  error={get(errors, `variantTitle1`)}
                />
              </Fragment>
            )}
            <Grid container justify-content="space-around" spacing={5}>
              <Grid item xs={6}>
                <label forhtml="pricePerUnit">Price per Unit</label>
                <CurrencyInput
                  name="pricePerUnit"
                  placeholder="0.00"
                  value={product.pricePerUnit}
                  handleChange={handleChange}
                  error={errors.pricePerUnit}
                />
              </Grid>
              <Grid item xs={6}>
                <label forhtml="retailPrice">Retail Price per Unit</label>
                <CurrencyInput
                  name="retailPrice"
                  placeholder="0.00"
                  value={product.retailPrice}
                  handleChange={handleChange}
                  error={errors.retailPrice}
                />
              </Grid>
            </Grid>
            <label forhtml="minimumOrder">Minimum Order</label>
            <CurrencyInput
              name="minimumOrder"
              placeholder="0.00"
              value={product.minimumOrder}
              handleChange={handleChange}
              error={errors.minimumOrder}
            />
            <Grid container justify-content="space-around" spacing={5}>
              <Grid item xs={6}>
                <label forhtml="quantity">Quantity Available</label>
                <TextInput
                  label=""
                  placeholder="1000"
                  name="quantity"
                  value={product.quantity}
                  handleChange={handleChange}
                  error={errors.quantity}
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <label forhtml="unitsPerCarton">Units per Case</label>
                <TextInput
                  label=""
                  placeholder="12"
                  name="unitsPerCarton"
                  value={product.unitsPerCarton}
                  handleChange={handleChange}
                  error={errors.unitsPerCarton}
                  type="number"
                />
              </Grid>
            </Grid>
          </StyledPaper>
          <StyledPaper style={{ marginTop: 20 }}>
            <AdminUploader label="Upload Product Images">
              <MultipleImageUploader
                images={product.images}
                folder="products"
                id={uploaderId}
                onImageUpload={e => {
                  handleChange(e, { imageUploader: true, field: 'images' })
                }}
              />
              <Typography color="error" variant="caption" gutterBottom>
                {errors.images}
              </Typography>
            </AdminUploader>
          </StyledPaper>
        </Grid>
      </Grid>
      {multipleVariants && (
        <Grid container spacing={5}>
          {[...Array(numberOfVariants).keys()].map(variantNumber => (
            <NewVariant
              variantNumber={variantNumber + 2}
              product={product}
              handleChange={handleChange}
              errors={errors}
              uploaderId={uploaderId}
              setNumberOfVariants={setNumberOfVariants}
              numberOfVariants={numberOfVariants}
              toggleMultipleVariants={toggleMultipleVariants}
              option={option}
            />
          ))}
          <Grid item xs={12}>
            <StyledLink color="secondary" underline="always" onClick={() => setNumberOfVariants(2)}>
              Add another Variant
            </StyledLink>
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

ProductForm.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  uploaderId: PropTypes.number.isRequired,
}
const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default connect(mapStateToProps)(ProductForm)
