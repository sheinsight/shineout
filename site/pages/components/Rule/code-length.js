import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.length(1, 100))
console.log(rule.length(1, 100, 'Nubmer must between 1 - 100.'))
