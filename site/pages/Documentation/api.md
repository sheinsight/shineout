# API 约定

为了避免在不同的组件上相同的props不同的功能，或者相同的功能不同的名称产生的歧义，这里约定了一些通用的props名称和功能。

| 名称 | 类型 | 说明 |
| -- | -- | -- |
| data | object,array | 数据，类型为 array 或者 object |
| placeholder | string,element,function | 类似 input 类组件的占位，可能是字符串，也可能是组件或者render函数 |
| type | string | 在 Alert, Button, Message 等展示型组件中传递状态(如：'primary', 'success')；在输入型组件（如：Input）中表示类型 |
| value | any | 初始化值 |