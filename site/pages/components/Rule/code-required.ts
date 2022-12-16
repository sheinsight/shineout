import { Rule } from 'shineout'

const rule = Rule()
console.log(rule.required('something wrong.'))

const rule2 = Rule({
  required: {
    message: 'init message.',
  },
})
console.log(rule2.required())
