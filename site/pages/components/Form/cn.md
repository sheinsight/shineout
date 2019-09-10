# Form *表单*

Form 是一个比较复杂的组件，由下列组件组成

- **Form：** 表单
- **Form.Item：** 表单项，用来布局，显示标签，提示文案信息等。
- **Form.Field：** 用于处理自定义组件，实现rules校验，存储数据功能。
- **Form.FieldSet：** 用来处理一组字段。
- **Form.Flow：** 数据流，用来处理数据联动。

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
| mode | string | | 模式，和 useMode 配合使用 |
| onChange | function(data) | | 表单内组件值变化函数 |
| onError | function(err) | | 异常回调处理 |
| onSubmit | function(data) | | 表单提交函数。表单内部校验失败时不会触发。 |
| removeUndefined | bool | true | 是否删除值为 undefined 的字段，默认值为删除 |
| rules | object | | 校验规则，详见 Rules |
| scrollToError | bool\|number | false | 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量 |
| style | object | | 扩展样式 |
| throttle | number | 1000 | ms, 两次提交间隔时长（防止重复提交）|
| initValidate | bool | false | 设置 value 后是否自动校验 |

### Form.Item
表单项，主要用来布局，显示标签，提示文案信息等

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | string \| ReactElement | undefined | 未定义时，标签不会render，也不会占位。如果无内容需要占位，使用空字符串 ''。 |
| labelAlign | string | | 可选值为 \['top', 'right']，默认为左边对齐。 |
| labelWidth | string \| number | 140px | 标签宽度，labelAlign 为 'top' 时无效。 |
| required | boolean | false | 必填标记，纯展示用，不会触发校验 |
| tip | string | | 提示文案 |

### Form.Field
用于处理自定义表单组件，使自定义表单组件实现通过rules校验，存储数据功能

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bind | array | 无 | 绑定校验字段名。当值变化后，触发绑定的字段校验。 |
| children | ReactElement\|function(object) | 必填 | 支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下<br />value: 根据 name 从上级 Form 或 Form.Block 获取的值<br />error：数据校验错误信息，类型为 Error<br />onChange: 值改变回调函数  |
| defaultValue | string \| number | | 默认值 |
| name | string | 无 | Form 存取数据的名称 |
| rules | array | 无 | 校验规则 | 

### Form.FieldSet
用来处理 object 类型 字段和数组。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | !function | 必填 | children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素name 为 b，children 实际处理的数据为 a.b |
| children | function(options) :ReactElement | 必填 | children 为 function 时，用来处理数组数据。options 属性为<br />list: name 下的全部数据<br />value：根据name获取的值的单条数据<br />onChange：子组件数据改变回调<br />onRemove：子组件删除回调<br />index：当前项索引<br />onInsert: 在当前项之前插入一条数据<br />onAppend: 在当前项之后附加一条数据|
| defaultValue | string \| number | | 默认值 |
| empty | function(onInsert):ReactElement | 无 | 数据为空时展示内容。（仅在children为function时有效） |
| name | string | 必填 | 从 Form 中存取数据的名称 |
| rules | array | 无 | 校验规则 | 

### Form.Flow

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | function(datum) :ReactElement | 必填 | datum 为 Datum.Form 对象 |
| names | array | 无 | names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化 |

### Submit, Reset, Button
同 [Button](/components/Button)


### ~~Form.Block~~ 不推荐

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| labelWidth | string \| number | 140px | 标签宽度，labelAlign 为 'top' 时无效。 |
| onChange | function(value) | 必填 | 值改变回调函数 | 
| value | any | 必填 | 值 |

### ~~Form.BlockField~~ 不推荐

同 Form.Field

### ~~Form.Loop~~ 不推荐

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | function(options) :ReactElement | 必填 | options 属性为<br />list: name 下的全部数据<br />value：根据name获取的值的单条数据<br />onChange：子组件数据改变回调<br />onRemove：子组件删除回调<br />index：当前项索引<br />onInsert: 在当前项之前插入一条数据<br />onAppend: 在当前项之后附加一条数据|
| empty | function(onInsert):ReactElement | 无 | 数据为空时展示内容 |
| name | string | 必填 | 从上层表单中获取值的key，获取的数据必须为 array 类型 |