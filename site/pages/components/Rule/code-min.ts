import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.min(1))
console.log(rule.min(1, 'At least select one option.'))
