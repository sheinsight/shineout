# Props 约定

为了避免在不同的组件上相同的props不同的功能，或者相同的功能不同的名称产生的歧义，这里约定了一些通用的props名称和功能。

## className *- string*
除 Message 这种静态调用的组件外，全部组件需要支持以 className 扩展样式。

## data *- object | array*
数据项。通常用在 *Select*, *Table* 等根据数据渲染的组件。

## fetch *- Promise*
需要传入data的组件，可以传入一个 fetch 作为数据项，如果同时传入 data 和 fetch，fetch 无效。

## keygen *- string | function | true*
*Select*, *Table* 等根据数据渲染的组件，生成 key 的规则。

#### 当 keygen 为 string 时，获取数据项的对应属性作为key
```
const data = [
  { uid: 1, name: '123' },
  { uid: 2, name: '456' },
  ...
]

<Select keygen="uid" /> // key=1, key=2
```

#### 当 keygen 为 function 时，会返回数据项，生成key
```
const data = [
  { uid: 1, name: '123' },
  { uid: 2, name: '456' },
  ...
]

<Select keygen={(d) => d.uid + name} /> // key='1123', key='2456'
```

#### 当 keygen 为 true 时，以数据项本身作为 key
```
const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

<Select keygen /> // key='red', key='orange'
```

## placeholder *- string | ReactElement | function*
input 类组件的占位项。可以是字符串，React组件或者render函数

## type *- string*
在 Alert, Button, Message 等展示型组件中传递状态，如：'primary', 'success'。

在输入型组件（如：Input）中表示类型，如：'text', 'password'。

## size *- string | number*
通常为 'small', 'default', 'large' 三选一，默认值为 'default'

## style *- object*
除 Message 这种静态调用的组件外，全部组件需要支持以 style 设置最外层元素样式。

## value *- number | string | object*
初始值。