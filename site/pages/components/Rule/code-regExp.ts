import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.regExp('^[\\d\\s ().-]+$'))
console.log(rule.regExp('^[\\d\\s ().-]+$', 'Please enter a valid tel.'))
