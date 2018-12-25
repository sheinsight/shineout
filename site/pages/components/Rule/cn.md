# Rule 表单校验规则

<br />

<br />

Shineout Form 内部定义了一套数据校验机制，在 Form 内的组件上通过 rules 属性进行配置。

```
<Input rules={[...rule]}>
```

rules 是一个数组，每一条包含一个以下格式的配置。

## 规则

rule 共有 5 种格式，按优先级分别为：

- 函数：完全由调用者控制，理论上可以做所有校验。
  ```
  /**
   value - 当前组件值
   formdata - 表单内所有组件值 
   callback - 结果回调
   */ 
  (value, formdata, callback) => {
    if (/\d+/.test(value)) callback(true)
    else callback(new Error('Password at least has one numeral.'))
  }
  // 或者返回 Promise，不需要处理 callback
  (value) => new Promise((resolve, reject) => {
    if (/\d+/.test(value)) resolve(true)
    else reject(new Error('Password at least has one numeral.'))
  }
  ```
- 必填：根据 required 属性是否为 true 判断，非必填时不需填 false。
  ```
  { required: true, message: 'Please enter password.' }
  ```

- 长度：根据 min 或者 max 属性判断。
  ```
  { min: 7, message: 'Password must be at least 7 characters.' }
  ```

- 正则表达式：根据 regExp 来判断，可以是 RegExp 对象或 字符串。
  ```
  { regExp: /[a-z]+/i, message: 'Password at least has one letter.' }
  ```

- 类型：内置了一些常用的正则判断，不满足需求时，可以自定义正则表达式或使用 函数校验。
  ```
  { type: 'email', message: 'Please enter a valid email.' }
  ```

| 属性 | 类型 | 说明 |
| --- | --- | --- | --- |
| required | bool | 是否必填 |
| min | number | 最小值，type 为 'number' 时，判断数值大小，其他类型判断 length |
| max | number | 最大值，type 为 'number' 时，判断数值大小，其他类型判断 length |
| regExp | string \| RegExp | 正则表达式 |
| type | string | 类型校验，可选值为 \[ 'email', 'json', 'url', 'hex', 'number' ]，不支持的可以自定义 regExp 校验 |
| message | string | 错误消息。可以使用 '{key}' 符号进行格式化。key 为当前rule的属性。如 {min: 20, message: '最小值为 {min}'}，会格式化为 '最小值为 20'。 |

## Rule

规则的编写比较繁琐，为了简化用户使用，定义了一个Rule函数，生成一个辅助对象，并内置了一些校验规则，供快速开发。

```
import { Rule } from 'shineout'

const rule = Rule()

<Input rules={[rule.required, rule.min(1)]}>
```

## 初始化

```
const args = { key: { func, message }, ... }
const rule = Rule(args)
```

### 参数

args 为自定义规则，可为空。
每个参数为一个对象，key 为返回的 函数名称。每个 value 有两个参数，func 和 message。

#### - func *function(value, formData, callback, props)*
校验函数
```
value: 当前 Field 值。
formData: 当前表单全部数据。
callback: 回调函数，func 返回 Promise 时可不调用，否则必须执行。
props: 当前 Field 的 props，用来格式化 message。
```

例：

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
内置的规则会生成默认校验失败提示文案，如果需要覆盖默认文案，可以在初始化参数中覆盖。
```
message 为 string 时，返回 message。
message 为 函数时，返回 message(props)，props 为当前 Field props。
```

例：

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

如果传入多个 args 时，会合并处理
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
相当于
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

通过这种方式可以把自定义的校验规则和语言包分别引入。

### 返回值
返回对象包含一组函数生成校验规则。每个函数会根据参数生成一条新的规则。

```
const rule = Rule()

<Input rules={[rule.required(), rule.min(1)]}>
// 如果函数没有参数，可以只写函数名称
<Input rules={[rule.required, rule.min(1)]}>
```

## 自定义校验
<code name="custom" />


## 内置校验

### required *function(message)*
必填校验
#### message|string: 可选
#### 返回值：object

<code name="required" />

### min *function(len, message)*
最小值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
#### len|integer: 必填，最小值
#### message|string: 可选
#### 返回值：object

<code name="min" />

### max *function(len, message)*
最大值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
#### len|integer: 必填，最大值
#### message|string: 可选
#### 返回值：object

<code name="max" />

### range *function(min, max, message)*
数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
#### max|integer: 必填，最大值
#### min|integer: 必填，最小值
#### message|string: 可选
#### 返回值：array

<code name="range" />

### type *\[type](message)*
#### message|string: 可选
#### 返回值：object
内置了常用的类型校验，type可选值为 \['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']

<code name="type" />

### regExp *regExp(reg, message)*
正则表达式校验
#### reg|RegExp|string: 必填
#### message|string: 可选
#### 返回值：object

<code name="regExp" />

## 内置文案

当前语言内置校验文案如下，可以通过 setLocale 函数替换

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