# Input

<example />

## API

### Input

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | string \| number | - | Default value |
| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms.|
| name | string | none | The name of Form which access data |
| onChange | (value: string) => void | - | The callback function when the value is changing |
| onEnterPress | (value: string) => void | - | The callback function for enter key |
| placeholder | string | - | Same as the native input tag |
| popover | 'top-left' \| 'top' \| 'top-right' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | none | The position where the text pop up |
| size | 'large' \| 'default' \| 'small' | 'default' | size of input |
| style | object | - | Container element style |
| tip | ReactNode | none | Prompt information |
| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |
| type | string | 'text' | Same as the type of the native input tag |
| value | string \| number | - | The defaultValue and value can be set at the same time and defaultValue will be overridden by value<br />In the Form, the value will be taken over by the form and the value will lose efficacy. |
| clearable | () => void \| boolean | false | Remove content of the input when clicking the clear icon, clear event function |
| coin | boolean | false | Show as thousands separator, valid only when type is 'number' |
| info | ((value: string) => string) \| number | - | Infomation |
| popoverProps | object | none | Vilidate popup properties, specific properties refer to Popover component description |
| maxLength | number | none | input max length |
| forwardedRef | (el: HTMLElement) => void | none | get input element |
| underline | boolean | false | only display border bottom  |
| onKeyUp | (e: KeyboardEvent) => void | none | callback with key up |
| onKeyDown | (e: KeyboardEvent) => void | none | callback with key down |
| onMouseUp | () => void | 无 | callback with mouse up |
| onMouseDown | () => void | 无 | callback with mouse down |
| innerTitle | string | - | inner title |
| clearToUndefined | boolean | - | After clicking the clear button, the data becomes undefined |
| integerLimit | number | - | Integer bit limit (valid when type is number) |
| digits | number | - | Decimal place limit (valid when type is number) |
| numType | "positive" \| "non-negative" | - | set number type (valid when type is number) |
| autoSelect | boolean | - | Mouse click to automatically select everything |
| autoFix | boolean | - | Automatically fill up according to the precision limit of digits after out of focus (valid when type is number) |
| htmlName | string | - | The original property of html |
| onBlur | (e: Event) => void | 无 | The callback of blur |

### Input.Number

The basic API is the same as the above table, and the specific API is as follows:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| max | number | - | The maximum value |
| min | number | - | The minimum value|
| step | number | 1 | Change the digital span. It can be decimal. |
| allowNull | boolean | false | allow value is null |
| hideArrow | boolean | false | Whether to show increase/decrease buttons |
| coin | boolean | false | Show as thousands separator |

### Input.Password

The basic API is the same as the above table, and the specific API is as follows:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| point | string | '•' | password symbol |