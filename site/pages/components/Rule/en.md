# Rule

<br />

<br />

The Form implements a set of data validation. That is configured through the rules property on the input component like 'Input, Select, Checkbox, ...'


```
<Input rules={[...rule]}>
```

rules is an array, each containing a rule with the following format.

- Function:Completely controlled by the caller. you can theoretically do all the checking.
  ```
  /**
   value - Current component value
   formdata - All values in the form 
   callback - The result of verification
   */ 
  (value, formdata, callback) => {
    if (/\d+/.test(value)) callback(true)
    else callback(new Error('Password at least has one numeral.'))
  }
  // return a Promise，do not call callback
  (value) => new Promise((resolve, reject) => {
    if (/\d+/.test(value)) resolve(true)
    else reject(new Error('Password at least has one numeral.'))
  }
  ```

- Required:Determine whether the required attribute is true or not. false is not required when it is not required.
  ```
  { required: true, message: 'Please enter password.' }
  ```

- Length:Judge by the min or max property.
  ```
  { min: 7, message: 'Password must be at least 7 characters.' }
  ```

- RegExp: Judge by the RegExp. It can be a RegExp object or a string.
  ```
  { regExp: /[a-z]+/i, message: 'Password at least has one letter.' }
  ```

- Type: Some common type validation are built in. 
  ```
  { type: 'email', message: 'Please enter a valid email.' }
  ```


| Property | Type | Description |
| --- | --- | --- | --- |
| required | bool | whether to be required |
| min | number | The minimum value. When type is 'number', validate the value. Otherwise, validate the value.length.  |
| max | number | The maximum value. When type is 'number', validate the value. Otherwise, validate the value.length. |
| regExp | string \| RegExp | regular expression |
| type | string | options: \[ 'email', 'json', 'url', 'hex', 'number' ]. You can customize the regExp validation if it does not support it. |
| message | string | The error message. You can use the '{key}' symbol to format. Key is a property of the current rule, such as {min: 20, message: 'minimum value is {min}'}, which is formatted as 'minimum value is 20'. |


## Rule

Rule is a function return an object contains a set of validate function.

```
import { Rule } from 'shineout'

const rule = Rule()

<Input rules={[rule.required, rule.min(1)]}>
```

## Constructor

```
const args = { key: { func, message }, ... }
const rule = Rule(args)
```

### Arguments

The args is optional.
Each argument is an object, key is the validate function name. Each value has 2 properties, 'func' and 'message'.

#### - func *function(value, formData, callback, props)*
validate function
```
value: current field's value.
formData: all form data.
callback: the callback function.
props: the props of current field.
```

example:

```
const rule = Rule({
  customRequired: {
    func: (value, formData, callback, props) => {
      callback(!!value ? true : new Error(props.title + ' is required.'))
    }
  }
})
```

#### - message *string || function(props)*
Built-in rules use default error text, if you want change the default text, set message to overwrite.
```
if message type is string, return message.
if message type is function，retrun message(props)，props is field's props.
```

example：

```
const rule = Rule({
  required: {
    message: (props) => `The field ${props.title} is required.`
  },
  email: {
    message: 'Email is invalid.'
  }
})
```

Multiple arguments will be merged
```
const funcs = {
  customRequired: {
    func: (value, formData, callback, props) => {
      callback(!!value ? true : new Error(props.title + ' is required.'))
    }
  }
}
const messages = {
  customRequired: {
    message: 'The field is required.'
  }
}
const rule = Rule(funcs, messages)
```
equivalent of
```
const rule = Rule({
  customRequired: {
    func: (value, formData, callback, props) => {
      callback(!!value ? true : new Error(props.title + ' is required.'))
    },
    message: 'The field is required.'
  }
})
```

### Return

```
const rule = Rule()

<Input rules={[rule.required(), rule.min(1)]}>
// if the function has no argument, you can use it with out parentheses.
<Input rules={[rule.required, rule.min(1)]}>
```

## Custom Validator
<code name="custom" />


## Built-in Validator

### required *function(message)*
#### message|string: optional
#### return: object

<code name="required" />

### min *function(len, message)*
Minimum check, automatically determines whether the check type is a string, number, or option base on the field type.
#### len|integer: required
#### message|string: optional
#### retrun: object

<code name="min" />

### max *function(len, message)*
Max check, automatically determines whether the check type is a string, number, or option base on the field type.
#### len|integer: required
#### message|string: optional
#### return: object

<code name="max" />

### range *function(min, max, message)*
Range check, automatically determines whether the check type is a string, number, or option base on the field type.
#### min|integer: required
#### max|integer: required
#### message|string: optional
#### return: array

<code name="range" />

### type *\[type](message)*
Type check, one of \['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']
#### message|string: optional
#### return: object

<code name="type" />

### regExp *regExp(reg, message)*
Regular expression check
#### reg|RegExp|string: required
#### message|string: optional
#### return: object

<code name="regExp" />

## Built-in Text

The current built-in validation text as follows, which can be replaced by the setLocale function

```
import { setLocale } from 'shineout'
setLocale({
  rules: {
    required: ...
    type: ...
  }
})
```

<example name="locale" />