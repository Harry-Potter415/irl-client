import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Icon } from '@material-ui/core'
import styled from 'styled-components'
import CamapaignRule from 'components/campaigns/CreateCampaignRules/CampaignRule'
import { CAMPAIGN_RULE_TYPES } from 'lib/constants'
import { uniqueId } from 'lodash'

const RulesCard = styled(Card)`
  background-color: ${props => props.theme.palette.grey[50]} !important;
  border: 1px solid ${props => props.theme.palette.grey[350]};
  margin: -1px 0 0 -1px;
`
const RulesCardContent = styled(CardContent)`
  padding: 12px 24px !important;
  display: flex;
  min-height: 100px;
  &.header {
    flex-direction: column;
    justify-content: space-between;
  }
  &.rule {
    ${props => props.theme.breakpoints.down('sm')} {
      flex-wrap: wrap;
    }
  }
`
const Instructions = styled(Typography)`
  margin-top: 12px !important;
`
const RuleTypes = styled.div`
  display: flex;
  margin-top: 12px;
`
const RuleType = styled(Typography)`
  text-transform: none !important;
  letter-spacing: 0 !important;
  color: ${props => props.theme.palette.text.primary} !important;
  font-weight: 700 !important;
  flex: 0 0 50px;
  margin-right: 24px !important;
`
const NewRule = styled.div`
  display: flex;
  align-items: center;
`
const AddIcon = styled(Icon)`
  cursor: pointer;
  color: ${props => props.theme.palette.textColor.secondary};
`
const NewRuleText = styled(Typography)`
  cursor: pointer;
  color: ${props => props.theme.palette.textColor.secondary} !important;
`

class CreateCampaignRules extends Component {
  constructor(props) {
    super()
    const { campaign } = props
    let rules = {}
    if (campaign) {
      rules = this.buildRules(campaign)
    }
    this.state = {
      rules,
    }
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.setRuleType = this.setRuleType.bind(this)
    this.addRule = this.addRule.bind(this)
    this.deleteRule = this.deleteRule.bind(this)
    this.ruleChanged = this.ruleChanged.bind(this)
    this.permittedRules = this.permittedRules.bind(this)
    this.forbiddenRules = this.forbiddenRules.bind(this)
  }

  permittedRules() {
    const { rules } = this.state
    const result = Object.values(rules).map(rule => {
      return rule.type === CAMPAIGN_RULE_TYPES.permitted ? rule.text : null
    })
    return result.filter(rule => rule !== null)
  }

  forbiddenRules() {
    const { rules } = this.state
    const result = Object.values(rules).map(rule => {
      return rule.type === CAMPAIGN_RULE_TYPES.forbidden ? rule.text : null
    })
    return result.filter(rule => rule !== null)
  }

  // options:
  // changeAll - boolean - change all fields (required when rule type is changed)
  ruleChanged(rule, options = {}) {
    const { handleChange } = this.props
    if (options.changeAll) {
      handleChange(this.permittedRules(), { customField: true, field: 'permittedRules' })
      handleChange(this.forbiddenRules(), { customField: true, field: 'forbiddenRules' })
    } else if (rule.type === CAMPAIGN_RULE_TYPES.permitted) {
      handleChange(this.permittedRules(), { customField: true, field: 'permittedRules' })
    } else {
      handleChange(this.forbiddenRules(), { customField: true, field: 'forbiddenRules' })
    }
  }

  addRule() {
    const { rules } = this.state
    const rule = {
      id: uniqueId(),
      type: null,
      text: '',
    }
    rules[rule.id] = rule
    this.setState({ rules })
    this.ruleChanged(rule)
  }

  buildRule(text, type) {
    return {
      id: uniqueId(),
      text,
      type,
    }
  }

  buildRules(campaign) {
    const result = {}
    campaign.permittedRules &&
      campaign.permittedRules.forEach(text => {
        const rule = this.buildRule(text, CAMPAIGN_RULE_TYPES.permitted)
        result[rule.id] = rule
      })
    campaign.forbiddenRules &&
      campaign.forbiddenRules.forEach(text => {
        const rule = this.buildRule(text, CAMPAIGN_RULE_TYPES.forbidden)
        result[rule.id] = rule
      })
    return result
  }

  handleRuleChange(id, e) {
    const { rules } = this.state
    rules[id].text = e.target.value
    this.setState({ rules })
    this.ruleChanged(rules[id])
  }

  setRuleType(id, type) {
    const { rules } = this.state
    rules[id].type = type
    this.setState({ rules })
    this.ruleChanged(rules[id], { changeAll: true })
  }

  deleteRule(id) {
    const { rules } = this.state
    const rule = rules[id]
    delete rules[id]
    this.setState({ rules })
    this.ruleChanged(rule)
  }

  render() {
    const { rules } = this.state
    return (
      <div>
        <RulesCard>
          <RulesCardContent className="header">
            <Instructions variant="body1">
              Please let our partners know how you they should place your products.
            </Instructions>
            <RuleTypes>
              <RuleType variant="caption" gutterBottom>
                Do's
              </RuleType>
              <RuleType variant="caption" gutterBottom>
                Don'ts
              </RuleType>
            </RuleTypes>
          </RulesCardContent>
        </RulesCard>

        {Object.values(rules).map(rule => {
          return (
            <RulesCard>
              <RulesCardContent className="rule">
                <CamapaignRule
                  key={rule.id}
                  rule={rule}
                  handleRuleChange={this.handleRuleChange}
                  setRuleType={this.setRuleType}
                  deleteRule={this.deleteRule}
                />
              </RulesCardContent>
            </RulesCard>
          )
        })}

        <RulesCard>
          <RulesCardContent>
            <NewRule>
              <AddIcon onClick={this.addRule}>add</AddIcon>
              <NewRuleText variant="body1" onClick={this.addRule}>
                Add a new rule
              </NewRuleText>
            </NewRule>
          </RulesCardContent>
        </RulesCard>
      </div>
    )
  }
}

CreateCampaignRules.propTypes = {
  campaign: PropTypes.object,
  handleChange: PropTypes.func,
}

export default CreateCampaignRules
