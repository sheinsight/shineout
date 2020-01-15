# EditableArea

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | string | none | Set initial value |
| value | string | none | The value passed in when controlled |
| onChange | function(value) | none | Callback function when the value changes, making the component controlled when set with value |
| style | object | none | The outermost extension style of a component |
| clearable | bool | true | Whether to show the clear button |
| placeholder | string | none | The same as the native placeholder tag |
| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms. |
| trim | bool | false | When trim is true, blank characters are automatically deleted when lose focus |
| onBlur | func(e) | none | blur event |
| onFocus | func(e) | none | focus event |