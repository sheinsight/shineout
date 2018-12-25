import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.range(1, 100))
console.log(rule.range(1, 100, 'Nubmer must between 1 - 100.'))
