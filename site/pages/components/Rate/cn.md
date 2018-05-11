# Rate *评分*

Rate 为一个函数，返回一个指定 图标 或 文字 的组件，供多处复用。

<example />

## API

#### Rate function(background, front):ReactClass

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | ReactElement \| string \| array | 必填 | 待选项<br />类型为array时，从数组中依次选择，数量不够时平铺最后一个元素<br />其他类型平铺此元素 |
| front | ReactElement \| string \| array | front | 选中项，不填和待选项相同 |

### Rate

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | number | | 默认值 |
| disabled | bool | false | 是否只读 |
| max | number | 5 | 选项最大值，整数 |
| onChange | function(d) | | 值改变回调函数 |
| size | number \| string | 20 | 图标大小 |
| value | number | 0 | 作为可输入组件时，为整数，只读展示时，可以带小数 |