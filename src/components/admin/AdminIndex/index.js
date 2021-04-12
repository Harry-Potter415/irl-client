import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { kebabCase } from 'lodash'
import pluralize from 'pluralize'
import { titleize } from 'helpers/utils'
import styled from 'styled-components'
import { isMobile } from 'helpers/utils'

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

class AdminIndex extends Component {
  constructor() {
    super()
    this.newResource = this.newResource.bind(this)
    this.newRetailProduct = this.newRetailProduct.bind(this)
    this.shouldDisplayRetailButton = this.shouldDisplayRetailButton.bind(this)
  }

  newResource() {
    const { history, resourceName, displayedResourceName } = this.props
    history.push(`/admin/${kebabCase(pluralize(displayedResourceName || resourceName))}/new`)
  }

  newRetailProduct() {
    const { history } = this.props
    history.push('/admin/retail_products/new')
  }

  shouldDisplayRetailButton() {
    return this.props.resourceName === 'product'
  }

  render() {
    let { resourceName, canCreateResource, displayedResourceName } = this.props
    return (
      <div>
        <Toolbar>
          {this.props.actions || <span />}
          {canCreateResource && (
            <Fragment>
              {this.shouldDisplayRetailButton() && (
                <Button
                  style={{ marginRight: 20 }}
                  color="primary"
                  variant="contained"
                  onClick={this.newRetailProduct}
                  size={isMobile() ? 'small' : 'medium'}
                >
                  New Retail Product
                </Button>
              )}
              <Button
                color="primary"
                variant="contained"
                onClick={this.newResource}
                size={isMobile() ? 'small' : 'medium'}
              >
                New {titleize(kebabCase(displayedResourceName || resourceName).replace(/-/g, ' '))}
              </Button>
            </Fragment>
          )}
        </Toolbar>
        {this.props.children}
      </div>
    )
  }
}

AdminIndex.propTypes = {
  resourceName: PropTypes.string,
  history: PropTypes.object,
  canCreateResource: PropTypes.bool.isRequired,
}

AdminIndex.defaultProps = {
  canCreateResource: true,
}

export default AdminIndex
