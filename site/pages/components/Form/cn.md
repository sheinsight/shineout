# Form *表单*

Form 是一个比较复杂的组件，由下列组件组成

- **Form：** 表单外层
- **Form.Field：** 用于处理自定义表单组件，使自定义表单组件实现通过rules校验，存储数据功能。
- **Form.Item：** 表单项，主要用来布局，显示标签，提示文案信息等
- **Form.Submit：** submit 按钮的快捷方式。使用 Submit 时，enter 键会触发表单提交。
- **Form.Reset：** reset 按钮的快捷方式。
- **Form.Button：** 同 submit 按钮。使用 Button 时，enter 键不会触发表单提交。

<example />

## API

### Form
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | | 扩展className |
| datum | object \| Datum.Form | | formdata 辅助类，不设置Form内部会自动创建，通常情况下不需要设置。 |
| disabled | bool | false | 是否禁用，为 true 时，表单内所有元素 disabled 都为 true |
| inline | bool | false | 是否水平布局 |
| labelAlign | string | | 可选值为 \['top', 'right']，默认为左边对齐。 |
| labelWidth | string \| number | 140px | 标签宽度，labelAlign 为 'top' 时无效。 |
| onChange | function(data) | | 表单内组件值变化函数 |
| onSubmit | function(data) | | 表单提交函数。表单内部校验失败时不会触发。 |
| rules | object | | 校验规则，详见 Rules |
| style | object | | 扩展样式 |

### Rules
校验规则，格式为 { name: \[ rule ] }

- name 对应表单内组件的 name 属性
- 每一个 rule 只处理一个属性，例如同时设置了 required, regExp 和 min，只会处理 required。多个判断需要设置多个 rule。
- 判断的优先级为 function > required > min|max > regExp > type
- rule 可以为 function 或者 object

#### function(value, formdata, callback) : undefined

- value: 当前组件值
- formdata: 表单内所有组件值
- callback(true|Error): 校验结果，通过为 true，失败为 Error 对象

#### object

| 属性 | 类型 | 说明 |
| --- | --- | --- | --- |
| required | bool | 是否必填 |
| min | number | 最小值，type 为 'number' 时，判断数值大小，其他类型判断 length |
| max | number | 最大值，type 为 'number' 时，判断数值大小，其他类型判断 length |
| regExp | string \| RegExp | 正则表达式 |
| type | string | 类型校验，可选值为 \[ 'email', 'json', 'url', 'hex', 'number' ]，不支持的可以自定义 regExp 校验 |
| message | string | 错误消息。可以使用 '{key}' 符号进行格式化。key 为当前rule的属性。如 {min: 20, message: '最小值为 {min}'}，会格式化为 '最小值为 20'。 |

### Form.Item
表单项，主要用来布局，显示标签，提示文案信息等

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | string \| ReactElement | undefined | 未定义时，标签不会render，也不会占位。如果无内容需要占位，使用空字符串 ''。 |
| required | boolean | false | 必填标记，纯展示用，不会触发校验 |
| tip | string | | 提示文案 |

### Form.Field
用于处理自定义表单组件，使自定义表单组件实现通过rules校验，存储数据功能

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactElement | 必填 | 必须且只能传入一个 React 组件 |
| defaultValue | string \| number | | 默认值 |
| name | string | 无 | Form 存取数据的名称 |
| value | string \| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |

### Submit, Reset, Button
同 [Button](#/components/Button)