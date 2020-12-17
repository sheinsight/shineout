# Button *按钮*

<example />

## API

### Button

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | 必填 | 按钮里面的内容, 可以是文字图标等  |
| className | string | 无 | 扩展className |
| disabled | boolean | false | 禁用 |
| href | string | 无 | 如果设置了 href 属性，将会用 &lt;a> 代替 &lt;button> |
| outline | boolean | false | outline 为 true 时，显示透明背景的按钮 |
| size | 'large' \| 'default' \| 'small' | 'default' | 按钮尺寸 |
| style | object | 无 | 最外层扩展样式 |
| type | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'link' | 'default' | 可选值  |
| text | boolean | false | 文字按钮，不展示边框和背景 |
| onClick | () => void | 无 | 按钮点击回调 |
| space | boolean | false | 仅有2个汉字的按钮，是否在2个汉字中间插入空格 |

### Button.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | 必填 | 由 Button 组成的 array |
| size | 'large' \| 'default' \| 'small' | 无 | 同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准 |
| outline | boolean | 无 | 同 Button；如果 Button 未设置，使用此值 |
| type | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'link' | 无 | 同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准 |
