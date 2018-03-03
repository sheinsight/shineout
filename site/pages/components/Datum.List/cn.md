# Data.List 数据处理

这不是一个组件，使一个辅助组件进行数据处理的类。

在项目中有很多组件（例如Select，Table）需要传入复杂的数据，有一些交互的数据需要记录并返回提交。
这个类可以辅助这类组件做一些数据格式化的操作。


## 示例

这个页面中示例用到的数据如下
```
const data = [
  { id: 1, name: 'red' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'yellow' },
  { id: 4, name: 'green' },
  { id: 5, name: 'cyan' },
  { id: 6, name: 'blue' },
  { id: 7, name: 'violet' },
]
```
<code name="example" />

## 初始化参数

### format  *null | string | function(d)*
format 是Datum内部用来把复杂数据格式化为需要的值，可以为 null, string, function

- **null** - 为空时，返回值为原始数据
- **string** - 为string时，会作为key从原始数据中获取值，相当于 (d) => d\[format]
- **function(d)** - d 为单条原始数据

<code name="format" />

### separator *null | string*
分隔符。某些情况下，后端会以字符串的形式存储数据，用 ',' 或者自定义的字符分隔数据。为空时，会保留Array格式。

<code name="separator" />

### prediction *function(val, d):bool*
Datum内部存储的是format之后的值，所以需要prediction函数来比对存储的值和原始数据是否一致。不设置，会使用此默认值:
```
(val, d) => val === format(d)
```

通常用在 value 为字符串类型时，数据格式不一致的情况。

<code name="prediction" />