import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectStyles } from 'shopjs/components/Autosuggest/styles.js'
import { algolia } from 'shopjs/services/Algolia'

const SelectFilter = ({ facetName, placeholder, selectFilter, removeFilter }) => {
  const [facetQuery] = useState('')
  const [options, setOptions] = useState([{}])
  const [selectedOption, setSelectedOption] = useState({}) // eslint-disable-line no-unused-vars

  const searchFacets = async () => {
    let results = await algolia.searchForFacetValues({
      facetName,
      facetQuery,
    })

    let filterOptions = buildOptions(results)
    setOptions(filterOptions)
  }

  const buildOptions = results =>
    results.facetHits.map(fh => ({ label: `${fh.highlighted} (${fh.count})`, value: fh.value }))

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

  useEffect(() => {
    searchFacets()
  })

  return (
    <Select
      isSearchable
      isClearable
      styles={selectStyles}
      placeholder={placeholder}
      onChange={handleFilterChange}
      options={options}
    />
  )
}

export default SelectFilter
