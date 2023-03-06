import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.max(100))
console.log(rule.max(100, 'Nubmer must less than 100.'))
