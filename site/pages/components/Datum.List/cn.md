# Data.List 数据处理

列表数据辅助类，用来处理如 Select，Table 等组件在复杂数据情况下，格式化数据、校验状态、拼接结果等操作。


## 示例

这个页面中示例用到的数据如下
```
const data = {
  red: { id: 1, name: 'red' },
  orange: { id: 2, name: 'orange' },
  yellow: { id: 3, name: 'yellow' },
  green: { id: 4, name: 'green' },
  cyan: { id: 5, name: 'cyan' },
  blue: { id: 6, name: 'blue' },
  violet: { id: 7, name: 'violet' },
}
```
<code name="example" />

## 初始化参数

### format  *null | string | function(d)*
format 是Datum内部用来把复杂数据格式化为需要的值，可以为 null, string, function

- **null** - 为空时，返回值为原始数据
- **string** - 为string时，会作为key从原始数据中获取值，相当于 (d) => d\[format]
- **function(d)** - d 为单条原始数据

<code name="format" />

### onChange *function(value)*
值改变时触发的回调函数。value 为 format 函数格式化后的数据。

<code name="onchange" />

### separator *null | string*
分隔符。为空时，value会保留Array格式。不为空时，value会处理为 separator 分隔的字符串。

<code name="separator" />

### prediction *function(val, d):bool*
Datum内部存储的是format之后的值，所以需要prediction函数来比对存储的值和原始数据是否一致。不设置，会使用此默认值:
```
(val, d) => val === format(d)
```

通常用在 value 为对象时，值相同却不是同一个对象等情况。

<code name="prediction" />

### disabled *function(d):bool*
判断数据项是否禁用。如果返回 true，add 和 remove 函数会忽略此数据。

<code name="disabled" />

### value *array | string*
初始值，可以为 Array 或 String。

## 函数

### getValue *function():array|string*
获取当前值。根据separator的设置，返回array或者string。

### setValue *function(array|string)*
设置值。新的值会替代当前值。

### add *function(array|object)*
添加数据。值为 format 前的原始数据，单条或者一组数据。

### remove *function(array|object)*
移除数据。值为 format 前的原始数据，单条或者一组数据。

### clear *function*
清空数据。