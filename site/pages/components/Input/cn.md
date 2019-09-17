# Input *输入框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | string \| number | 无 | 默认值 |
| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒。|
| name | string | 无 | Form 存取数据的名称 |
| onChange | function(value) | 无 | 值改变回调函数 |
| onEnterPress | function(value) | 无| 回车键回调函数 |
| placeholder | string | 无 | 同原生 input 标签的 placeholder |
| popover | string | 无| 信息弹出位置，可选值为 \['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'] |
| size | string | 'default' | 可选值 \['large', 'default', 'small'] |
| style | object | 无 | 最外层扩展样式 |
| tip | string \| ReactElement | 无 | 提示信息 |
| trim | bool | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |
| type | string | 'text' | 同原生 input 标签的 type |
| value | string \| number | 无 | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| clearable | bool | false | 可点击清空图标删除输入框内容 |

### Input.Number

基本 API 和上表相同，特定的 API 如下：

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| max | number | 无 | 最大值 |
| min | number | 无 | 最小值 |
| step | number | 1 | 改变数字跨度，可为小数 |
| digits | number | 无 | 数值的精度 |
| allowNull | bool | false | 允许空值 | 
