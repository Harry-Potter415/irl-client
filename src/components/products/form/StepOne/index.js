import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'components/inputs/TextInput'
import FormHeader from 'components/layout/FormHeader'
import FormContainer from 'components/layout/FormContainer'

class StepOne extends Component {
  render() {
    let { product, handleChange, errors, subtitle } = this.props
    return (
      <FormContainer>
        <FormHeader subtitle={subtitle} title="Add Product Information" />
        <TextInput
          label="Product name*"
          placeholder="Extra Energy drink Berry flavor 12oz"
          name="title"
          value={product.title}
          handleChange={handleChange}
          error={errors.title}
        />
        <TextInput
          label="Description*"
          placeholder="Organic natural energy drink brewed from the Guayusa leaf found almost exclusively in the Amazonian forests in Ecuador. Ingredients include carbonated water, organic Guayusa leaves, organic cane sugar & 150mg of natural caffeine. This game-changing drink provides sustained energy, mental clarity and focus, without feeling a crash."
          name="description"
          value={product.description}
          multiline
          rows="6"
          handleChange={handleChange}
          error={errors.description}
        />
        <TextInput
          label="Product link on your shop*"
          name="url"
          value={product.url}
          handleChange={handleChange}
          error={errors.url}
        />
      </FormContainer>
    )
  }
}

StepOne.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
}

export default StepOne
