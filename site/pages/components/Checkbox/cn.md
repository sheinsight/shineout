# Checkbox *复选框*

Checkbox 可以单独使用。一组Checkbox使用时，使用一个Array类型的属性 data 来控制选项。

<example />

## API

### Checkbox

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | bool \| 'indeterminate' | 无 | checked 传入时为受控组件 |
| disabled | bool | false | 是否禁用 |
| htmlValue | any | true | 选中时返回值 |
| onChange | function(value,checked) | 无 | 选中时，value 为 htmlValue，checked 为 true<br />未选中时，value 为 undefined，checked 为 false |
| value | any | 无 | 如果 checked 未设置，checked 状态为 value === htmlValue |

### Checkbox.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | array | 必填 | 数据项 |
| datum | object | 无 | 数据处理，可以传入一个 [Datum.List](#/components/Datum.List) 对象，或者 Datum.List 配置 |
| disabled | bool | false | 是否禁用 |
| keygen | string \| function(obj):string | index | 生成每一项key的辅助方法<br />不填的情况下，会使用index(不推荐，在某些情况下可能会有问题)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| onChange | function(value) | 无 | value 为 datum.getValue() |
| renderItem | string \| function(d) | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |