# Select *选择框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | bool | false | 是否可清除值 |
| data | array | 必填 | 数据项，单条数据作为 value 的数据必须是唯一的 |
| datum | object | 无 | 数据处理，可以传入一个 [Datum.List](#/components/Datum.List) 对象，或者 Datum.List 配置 |
| defaultValue | array | | 初始值 |
| disabled | bool | false | 是否禁用 |
| filterDelay | number | 400 | 毫秒。用户输入触发 fitler 事件的延时 |
| name | string | 无 | Form 存取数据的名称 |
| keygen | string \| function(obj):string | index | 生成每一项key的辅助方法<br />不填的情况下，会使用index(不推荐，在某些情况下可能会有问题)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| onChange | function(value) | 无 | value 为 datum.getValue() |
| onCreate | function \| bool | 无 | 如果设置了 onCreate 事件，组件为可输入状态<br />onCreate为函数时，将此函数返回值作为新的选项拆入最上方<br />onCreate为true时，使用默认函数 text => text |
| onFitler | function | 无 | onFilter 不为空时，可以输入过滤数据<br />onFilter 如果返回一个函数，使用这个函数做前端过滤<br />如果不返回，可以自行做后端过滤 |
| renderItem | string \| function(d) | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| renderResult | string \| function(d) | renderItem | 选中后在结果中显示的内容，默认和 renderItem 相同 |
| value | array | | 在Form中，value会被表单接管，value无效 |