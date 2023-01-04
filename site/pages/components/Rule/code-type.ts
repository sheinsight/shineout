import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.email())
console.log(rule.email('Email is invalid.'))
console.log(rule.integer('Please enter a valid age.'))
console.log(rule.number('Please enter a valid price.'))
console.log(rule.url('The url is not valid.'))
console.log(rule.hex('The color is not valid.'))
