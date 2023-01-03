import { Rule } from 'shineout'

const rule = Rule({
  isExisted: {
    func: (value, formData, callback, props) => {
      if (formData.list.includes(value)) {
        callback(new Error(props.message.replace('{title}', props.title)))
      } else {
        callback(true)
      }
    },
    message: '{title} is existed.',
  },
})
console.log(rule.isExisted())
