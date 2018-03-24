# Data.Form 表单数据处理

Form 表单数据处理辅助类。

## 示例

<code name="example" />

实际使用见 [Form](#/components/Form)

## 初始化参数

### removeUndefined *boolean*

是否移除值为 undefined 的数据，默认值为 true。

### flatten *boolean*

是否扁平化处理嵌套数据，默认值为 false。

<code name="nested" />

### onChange *function(data)*

值变化时回调函数。

## 函数

### getValue *function():object*
获取当前表单所有对象值。

### setValue *function(object)*
设置值。新的值会替代当前值。

### set *fuction(name, value)*
设置数据。

### get *fuction(name)*
获取单个字段值。