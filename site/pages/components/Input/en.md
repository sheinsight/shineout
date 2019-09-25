# Input

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | string \| number | - | Default value |
| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms.|
| name | string | none | The name of Form which access data |
| onChange | function(value) | - | The callback function when the value is changing |
| onEnterPress | function(value) | - | The callback function for enter key |
| placeholder | string | - | Same as the native input tag |
| popover | string | none | The position where the text pop up, options: \['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'] |
| size | string | 'default' | options: \['large', 'default', 'small'] |
| style | object | - | Container element style |
| tip | string \| ReactElement | none | Prompt information |
| trim | bool | false | When trim is true, blank characters are automatically deleted when lose focus。 |
| type | string | 'text' | Same as the type of the native input tag |
| value | string \| number | - | The defaultValue and value can be set at the same time and defaultValue will be overridden by value<br />In the Form, the value will be taken over by the form and the value will lose efficacy. |
| clearable | bool | false | Remove content of the input when clicking the clear icon |


### Input.Number

The basic API is the same as the above table, and the specific API is as follows:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| max | number | - | The maximum value |
| min | number | - | The minimum value|
| step | number | 1 | Change the digital span. It can be decimal. |
| digits | number | - | the digits of number |
| allowNull | bool | false | allow value is null |
