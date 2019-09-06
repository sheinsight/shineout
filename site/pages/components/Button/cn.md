# Button *按钮*

<example />

## API

### Button

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | string \| ReactElement | 必填 | 按钮里面的内容, 可以是文字图标等  |
| className | string | 无 | 扩展className |
| disabled | bool | false | 禁用 |
| href | string | 无 | 如果设置了 href 属性，将会用 &lt;a> 代替 &lt;button> |
| outline | boolean | false | outline 为 true 时，显示透明背景的按钮 |
| size | string | 'default' | 可选值 \['large', 'default', 'small'] |
| style | object | 无 | 最外层扩展样式 |
| type | string | 'default' | 可选值 \['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'link'] |

### Button.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | \[Button] | 必填 | 由 Button 组成的 array |
| size | string | 无 | 同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准 |
| outline | boolean | 无 | 同 Button；如果 Button 未设置，使用此值 |
| type | string | 无 | 同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准 |