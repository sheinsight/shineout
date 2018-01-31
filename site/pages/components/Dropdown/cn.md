# Dropdown *下拉*

## API
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | array | 必填 | 一组 ReactElement； |
| className | string | 无 | 扩展className |
| href | string | 无 | 如果 href 不为空，使用一个 Button 单独处理下拉事件 |
| hover | boolean | false | 为 true 时，通过 mouseenter 触发选项弹出  |
| onClick | func | 无 | 如果 onClick 事件不为空，使用一个 Button 单独处理下拉事件 |
| outline | boolean | false | 同 [Button](#/components/Button) |
| placeholder | string \| ReactElement | 必填 | 按钮显示内容 |
| size | string | 'default' | 同 [Button](#/components/Button) |
| type | string | 'default' | 可选值 \['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| width | number | 无 | 弹出选项层的宽度 |

<example />