import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import TextInput from 'components/inputs/TextInput'
import ReactSelect from 'components/inputs/ReactSelect'
import {
  loadAdminUserOptions,
  loadAdminProductOptions,
  loadAdminAddressOptions,
  buildProductsOption,
  buildUserOption,
  buildAdminAddressOption,
  buildShopifyVariantOption,
  loadShopifyVariantOption,
  buildShopifyHandleOption,
  loadSearchPlacementsHandlesOption,
  loadSearchShopHandlesOption,
} from 'helpers/react-select'
import DatePickerInput from 'components/inputs/DatePickerInput'
import ImageUploader from 'components/images/ImageUploader'
import { loadCityOptions, buildOptions } from 'helpers/react-select'
import AdminUploader from 'components/admin/AdminUploader'
import { SIGNUP_OPTIONS } from 'lib/constants'
import Sync from 'react-select'

class CampaignForm extends Component {
  render() {
    let { campaign, handleChange, errors, uploaderId } = this.props

    return (
      <div>
        <TextInput
          label="Title"
          name="title"
          value={campaign.title}
          handleChange={handleChange}
          error={errors.title}
        />
        <TextInput
          label="Description"
          name="description"
          value={campaign.description}
          multiline={true}
          handleChange={handleChange}
          error={errors.description}
        />
        <ReactSelect
          defaultValue={buildUserOption(campaign.user)}
          hasValue={Boolean(campaign.userId)}
          label="User"
          name="userId"
          loadOptions={loadAdminUserOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'userId' })
          }}
          error={errors.userId}
        />
        <ReactSelect
          defaultValue={buildProductsOption(campaign.products)}
          hasValue={Boolean(campaign.productIds)}
          label="Products"
          name="productIds"
          loadOptions={loadAdminProductOptions}
          isMulti={true}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'productIds', isMulti: true })
          }}
          error={errors.productIds}
        />
        <ReactSelect
          defaultValue={buildAdminAddressOption(campaign.warehouseAddress)}
          hasValue={Boolean(campaign.warehouseAddressId)}
          label="Warehouse Address"
          name="warehouseAddressId"
          loadOptions={loadAdminAddressOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'warehouseAddressId' })
          }}
          error={errors.warehouseAddressId}
          isClearable
        />
        <TextInput
          label="Promo Code"
          name="promoCode"
          value={campaign.promoCode}
          multiline={true}
          handleChange={handleChange}
          error={errors.promoCode}
        />
        <TextInput
          label="Quantity"
          name="quantity"
          value={campaign.quantity}
          handleChange={handleChange}
          error={errors.quantity}
          type="number"
        />
        <ReactSelect
          isMulti
          defaultValue={buildOptions(campaign.cities)}
          hasValue={!!(campaign.cities && campaign.cities.length)}
          label="Select Cities"
          name="cities"
          loadOptions={loadCityOptions}
          handleChange={e => {
            handleChange(e, { reactSelect: true, field: 'cities', isMulti: true })
          }}
          error={errors.cities}
        />
        <ReactSelect
          isMulti="true"
          label="Age Group"
          name="ageGroup"
          defaultValue={buildOptions(campaign.ageGroup)}
          options={SIGNUP_OPTIONS.ageGroups}
          SelectComponent={Sync}
          hasValue={campaign.ageGroup && campaign.ageGroup.length > 0}
          handleChange={e => {
            handleChange(e, {
              reactSelect: true,
              field: 'ageGroup',
              isMulti: true,
            })
          }}
        />
        <ReactSelect
          isMulti="true"
          label="Audience"
          name="audience"
          defaultValue={buildOptions(campaign.audience)}
          options={SIGNUP_OPTIONS.audiences}
          SelectComponent={Sync}
          hasValue={campaign.audience && campaign.audience.length > 0}
          handleChange={e => {
            handleChange(e, {
              reactSelect: true,
              field: 'audience',
              isMulti: true,
            })
          }}
        />
        <Tooltip
          placement="top-end"
          title={
            <Fragment>
              To search for a product, type the <em>beginning</em> of a word found in its{' '}
              <em>title</em>
            </Fragment>
          }
        >
          <ReactSelect
            defaultValue={buildShopifyHandleOption(campaign.shopifyHandle)}
            hasValue={!!campaign.shopifyHandle}
            label="Trial Placement Handle"
            name="shopifyHandle"
            loadOptions={loadSearchPlacementsHandlesOption()}
            handleChange={e => {
              handleChange(e, { reactSelect: true, field: 'shopifyHandle' })
            }}
            error={errors.shopifyHandle}
          />
        </Tooltip>

        <ReactSelect
          defaultValue={
            campaign.shopifyProduct &&
            buildShopifyVariantOption(
              campaign.shopifyProduct.variants.find(variant => variant.id === campaign.shopifyId)
            )
          }
          hasValue={Boolean(campaign.shopifyId)}
          label="Trial Placement Variant"
          name="shopifyId"
          loadOptions={loadShopifyVariantOption(campaign.shopifyHandle)}
          handleChange={e => handleChange(e, { reactSelect: true, field: 'shopifyId' })}
          error={errors.shopifyHandle}
          key={`variant-${campaign.shopifyHandle}`} // reload options on handle change
        />

        <Tooltip
          placement="top-end"
          title={
            <Fragment>
              To search for a product, type the <em>beginning</em> of a word found in its{' '}
              <em>title</em>
            </Fragment>
          }
        >
          <ReactSelect
            defaultValue={buildShopifyHandleOption(campaign.shopifyShopHandle)}
            hasValue={!!campaign.shopifyShopHandle}
            label="Shop Product Handle"
            name="shopifyShopHandle"
            loadOptions={loadSearchShopHandlesOption()}
            handleChange={e => {
              handleChange(e, { reactSelect: true, field: 'shopifyShopHandle' })
            }}
            error={errors.shopifyShopHandle}
          />
        </Tooltip>

        <ReactSelect
          defaultValue={
            campaign.shopifyShopProduct &&
            buildShopifyVariantOption(
              campaign.shopifyShopProduct.variants.find(
                variant => variant.id === campaign.shopifyShopId
              )
            )
          }
          hasValue={Boolean(campaign.shopifyShopId)}
          label="Shop Product Variant"
          name="shopifyShopId"
          loadOptions={loadShopifyVariantOption(campaign.shopifyShopHandle)}
          handleChange={e => handleChange(e, { reactSelect: true, field: 'shopifyShopId' })}
          error={errors.shopifyShopHandle}
          key={`shop-variant-${campaign.shopifyShopHandle}`} // reload options on handle change
        />
        <DatePickerInput
          value={campaign.startDate}
          handleChange={e => {
            handleChange(e, { datePickerSelect: true, field: 'startDate' })
          }}
          label="Start date"
          error={errors.startDate}
        />
        <DatePickerInput
          value={campaign.endDate}
          handleChange={e => {
            handleChange(e, { datePickerSelect: true, field: 'endDate' })
          }}
          label="End date"
          error={errors.endDate}
        />
        <AdminUploader label="Photo">
          <ImageUploader
            imageUrl={campaign.imageUrl}
            folder="campaigns"
            id={uploaderId}
            onImageUpload={e => {
              handleChange(e, { imageUploader: true, field: 'imageUrl' })
            }}
          />
        </AdminUploader>
      </div>
    )
  }
}

CampaignForm.propTypes = {
  campaign: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  uploaderId: PropTypes.number.isRequired,
}

export default CampaignForm
