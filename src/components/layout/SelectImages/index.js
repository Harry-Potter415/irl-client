import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CheckboxInput from 'components/inputs/CheckboxInput'
import { toggleActive, selectAll, isSelected } from 'helpers/select-items'
import { Grid } from '@material-ui/core'

const Images = styled(Grid)`
  margin-top: 1rem;
  margin-bottom: 4rem;
`
const Image = styled(Grid)`
  padding: 2px;
  img {
    max-width: 100%;
    height: auto;
  }
`
const Selectable = styled.span`
  display: inline-block;
  margin-right: 5px;
  img {
    margin: 0 !important;
  }
  ${props => {
    return (
      props.active &&
      css`
        border: 1px solid blue;
      `
    )
  }}
`
const Actions = styled.div`
  margin-bottom: 10px;
  button {
    margin-right: 10px;
  }
`

class SelectImages extends Component {
  constructor() {
    super()
    this.state = {
      activeItems: [],
      selectAll: false,
    }
    this.onSelect = this.onSelect.bind(this)
    this.isSelected = isSelected.bind(this)
    this.selectAll = selectAll.bind(this, this.onSelect)
    this.toggleActive = toggleActive.bind(this)
    this.resetActiveItems = this.resetActiveItems.bind(this)
    this.getItems = this.getItems.bind(this)
  }

  onSelect() {
    const { onSelect } = this.props
    const { activeItems } = this.state
    onSelect(activeItems)
  }

  resetActiveItems() {
    this.setState({ activeItems: [] }, this.onSelect)
  }

  getItems() {
    return this.props.images
  }

  render() {
    const { images, buttons } = this.props
    const { selectAll } = this.state
    if (images.length === 0) return null
    return (
      <div>
        <Actions>
          <CheckboxInput label="Select All" value={selectAll} handleChange={this.selectAll} />
          {buttons}
        </Actions>
        <Images container>
          {images.map((image, index) => {
            return (
              <Image key={index} item md={3}>
                <Selectable
                  active={this.isSelected(image)}
                  onClick={() => {
                    this.toggleActive(image, this.onSelect)
                  }}
                >
                  <img src={image} alt="" />
                </Selectable>
              </Image>
            )
          })}
        </Images>
      </div>
    )
  }
}

SelectImages.propTypes = {
  images: PropTypes.array,
  onSelect: PropTypes.func,
  buttons: PropTypes.object,
}

SelectImages.defaultProps = {
  images: [],
}

export default SelectImages
