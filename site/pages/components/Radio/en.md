# Radio

<example />

## API

Radio cannot be used alone.

### Radio

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| checked | boolean \| 'indeterminate' | - | if not set, use (value === htmlValue). |
| disabled | boolean | false | disable checkbox |
| htmlValue | any | true | Specifies the result |

### Radio.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | any | | default value. |
| data | any[] | required | the data items |
| disabled | (data: any) => boolean \| boolean  | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| format | (data: any) => any \| string | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d\[format\]<br />When it is a function, the result returned by the function will be the value. |
| keygen | ((data: any) => string) \| string \| true  | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| name | string | none | The name of a Form that accesses data |
| onChange | (value: any) => void | none | value is the datum.getValue() |
| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function used to determine whether match. |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| value | any | | In the Form, value is taken over by the Form and the value will be invalid. |
