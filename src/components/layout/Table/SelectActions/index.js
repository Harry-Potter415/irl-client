import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseCheckboxInput from 'components/inputs/CheckboxInput'
import { Button, Paper, Grow } from '@material-ui/core'
import styled from 'styled-components'

const Toolbar = styled(Paper)`
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #fff;
  top: 0px;
  left: 0px;
  height: 70px;
  width: 100%;
  padding: 10px 40px;
  z-index: 9999;
`

const Wrapper = styled.div`
  display: flex;
  padding: 0 15px;
`

const CheckboxInput = styled(BaseCheckboxInput)`
  border: solid 1px red;
`

const ToolbarButton = styled(Button)`
  margin: 10px 0;
  margin-right: 5px !important;
`

class SelectActions extends Component {
  render() {
    const {
      approveLabel,
      rejectLabel,
      onSelectAll,
      activeItems,
      selectAll,
      approve,
      reject,
    } = this.props
    return (
      <Wrapper>
        <CheckboxInput label="Select All" value={selectAll} handleChange={onSelectAll} />
        {!!activeItems.length && (
          <Grow in={true}>
            <Toolbar>
              <div>
                <ToolbarButton
                  color="primary"
                  variant="contained"
                  size="medium"
                  disabled={activeItems.length === 0}
                  onClick={approve}
                >
                  {approveLabel || 'Approve'}
                </ToolbarButton>
                <ToolbarButton
                  color="secondary"
                  variant="contained"
                  size="medium"
                  disabled={activeItems.length === 0}
                  onClick={reject}
                >
                  {rejectLabel || 'Reject'}
                </ToolbarButton>
              </div>
            </Toolbar>
          </Grow>
        )}
      </Wrapper>
    )
  }
}

SelectActions.propTypes = {
  onSelectAll: PropTypes.func.isRequired,
  activeItems: PropTypes.array,
  selectAll: PropTypes.bool,
  approve: PropTypes.func,
  reject: PropTypes.func,
}

export default SelectActions
