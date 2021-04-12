import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextInput from 'components/inputs/TextInput'
import TrashIcon from 'icons/TrashIcon'
import { CAMPAIGN_RULE_TYPES } from 'lib/constants'
import { Hidden } from '@material-ui/core'

const inputStyle = {
  backgroundColor: '#FFF',
}
const Delete = styled.div`
  cursor: pointer;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const RadioButtonWrapper = styled.div`
  flex: 0 0 50px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const RadioButton = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid ${props => props.theme.palette.primary.main};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => (props.active ? props.theme.palette.primary.main : 'inherit')};
`

class CampaignRule extends Component {
  render() {
    const { rule, handleRuleChange, setRuleType, deleteRule } = this.props
    return (
      <Fragment>
        <RadioButtonWrapper>
          <RadioButton
            active={rule.type === CAMPAIGN_RULE_TYPES.permitted}
            onClick={() => {
              setRuleType(rule.id, CAMPAIGN_RULE_TYPES.permitted)
            }}
          />
        </RadioButtonWrapper>
        <RadioButtonWrapper>
          <RadioButton
            active={rule.type === CAMPAIGN_RULE_TYPES.forbidden}
            onClick={() => {
              setRuleType(rule.id, CAMPAIGN_RULE_TYPES.forbidden)
            }}
          />
        </RadioButtonWrapper>
        <Hidden smDown>
          <TextInput
            label="Rule*"
            name="new-rule"
            multiline
            value={rule.text}
            handleChange={e => handleRuleChange(rule.id, e)}
            style={inputStyle}
          />
        </Hidden>
        <Delete onClick={() => deleteRule(rule.id)}>
          <TrashIcon />
        </Delete>
        <Hidden mdUp>
          <TextInput
            label="Rule*"
            name="new-rule"
            multiline
            value={rule.text}
            handleChange={e => handleRuleChange(rule.id, e)}
            style={inputStyle}
          />
        </Hidden>
      </Fragment>
    )
  }
}

CampaignRule.propTypes = {
  rule: PropTypes.object,
  handleChange: PropTypes.func,
  setRuleType: PropTypes.func,
  deleteRule: PropTypes.func,
}

export default CampaignRule
