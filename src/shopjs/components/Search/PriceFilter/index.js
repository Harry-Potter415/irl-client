import React, { useState } from 'react'
import Select from 'react-select'
import { selectStyles } from 'shopjs/components/Autosuggest/styles.js'

const PriceFilter = ({ selectFilter, removeFilter }) => {
  const facetName = 'price'
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState({})

  const options = [
    { label: '$50 or less', value: '0 TO 50' },
    { label: '$50-$100', value: '50 TO 100' },
    { label: '$100-$200', value: '100 TO 200' },
    { label: '$200-$500', value: '200 TO 500' },
    { label: '$500-$1,000', value: '500 TO 1000' },
    { label: '$1,000 and up', value: '1000 TO 10000' },
  ]

  const handleFilterChange = option => {
    if (option) {
      let { value } = option
      selectFilter(facetName, value)
      setSelectedOption(option)
    } else {
      removeFilter(facetName)
      setSelectedOption({ value: '', label: '' })
    }
  }

  return (
    <Select
      isSearchable
      isClearable
      styles={selectStyles}
      placeholder="Select price"
      onChange={handleFilterChange}
      options={options}
    />
  )
}

export default PriceFilter
