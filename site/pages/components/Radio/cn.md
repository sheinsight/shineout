# Radio *单选框*
单选框通常需要一组 (Radio.Group) 使用。

<example />

## API

Radio 不能单独使用

### Radio.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | any | | 默认值，设置 value 时，会覆盖 defaultValue |
| data | array | 必填 | 数据项 |
| datum | object | 无 | 数据处理，可以传入一个 [Datum.List](#/components/Datum.List) 对象，或者 Datum.List 配置 |
| disabled | bool | false | 是否禁用 |
| keygen | string \| function(obj):string | index | 生成每一项key的辅助方法<br />不填的情况下，会使用index(不推荐，在某些情况下可能会有问题)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| name | string | 无 | Form 存取数据的名称 |
| onChange | function(value) | 无 | value 为 datum.getValue() |
| renderItem | string \| function(d) | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| value | any | | 在Form中，value会被表单接管，value无效 |