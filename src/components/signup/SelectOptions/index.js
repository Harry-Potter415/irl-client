import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import FormHeader from 'components/layout/FormHeader'
import Option from 'components/signup/Option'

const SelectOptions = ({ title, subtitle, field, options, selected, onSelect }) => (
  <Fragment>
    <FormHeader title={title} subtitle={subtitle} />
    <Grid container spacing={4}>
      <Grid container justify="center" spacing={4}>
        {options.map((option, i) => (
          <Option
            key={i}
            field={field}
            option={option}
            onSelect={onSelect}
            isSelected={selected.indexOf(option.value) > -1}
          />
        ))}
      </Grid>
    </Grid>
  </Fragment>
)

SelectOptions.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default SelectOptions
