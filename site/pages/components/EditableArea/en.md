# EditableArea

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | string | none | Set initial value |
| value | string | none | The value passed in when controlled |
| onChange | (value: string) => void | none | Callback function when the value changes, making the component controlled when set with value |
| style | object | none | The outermost extension style of a component |
| bordered | boolean | false | Whether to show the border |
| disabled | boolean | false | Whether to disable |
| clearable | boolean | true | Whether to show the clear button |
| placeholder | string | none | The same as the native placeholder tag |
| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms. |
| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus |
| onBlur | (e: MouseEvent) => void | none | blur event |
| onFocus | (e: MouseEvent) => void | none | focus event |
| absolute | boolean | false | When it is true, the pop-up layer of option append into document.body. |
| zIndex | number | 100 | When absolute is true, the EditableArea zIndex property value |
