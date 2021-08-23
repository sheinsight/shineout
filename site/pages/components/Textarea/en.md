# Textarea

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| autosize | boolean | false | Whether the height changes automatically with the content |
| defaultValue | string \| number | | default value |
| delay | number | 400 | User input triggers onChange and to check interval, unit: ms.|
| info | (value: string) => string \| number | - | Infomation |
| name | string | none | The name that accesses data from Form |
| onChange | (value: string) => void | | The callback function for changing value |
| onEnterPress | (value: string) => void | | The callback function for enter key |
| placeholder | string | | The same as the native placeholder tag. |
| popover | 'top-left' \| 'top' \| 'top-right' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | | The position where the message pops up |
| rows | number | 4 | The minimum row height. Same as native textarea rows property. |
| maxHeight | number \| string | - | the maxHeight of the textarea, scroll bars appear after more than | 
| style | object | - | Container element style |
| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |
| resize | boolean | false | support resize |
| value | string \| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |
| underline | boolean | false | only display border bottom  |
