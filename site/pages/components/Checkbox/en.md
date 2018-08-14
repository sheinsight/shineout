# Checkbox

<example />

## API

### Checkbox

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| checked | bool \| 'indeterminate' | - | It is a controlled component when the checked is passed in. |
| disabled | bool | false | disable checkbox |
| htmlValue | any | true | Specifies the result |
| name | string | - | The name of the Form which access data |
| onChange | function(value,checked) | none | When selected, value is htmlValue and checked is true.<br />When not selected, value is undefined and checked is false. |
| value | any | - | If the checked property is not set, its state is value === htmlValue.  |

### Checkbox.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | array | required | The data item |
| datum | object | none | If the format and prediction propertt do not meet the requirements, you can pass in a [Datum.List](#/components/Datum.List) object or the Datum.List configuration to process data. |
| defaultValue | array | [] | Initial value |
| disabled | bool \| function | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| format | string \| function | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format]<br />When it is a function, use its return value. |
| name | string | none | The name of the Form which access data |
| keygen | string \| function(obj):string \| true | required | Generate a auxiliary method for each key<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | function(value) | none | value 为 datum.getValue() |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | string \| function(d) | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| value | array | | In the Form, the value will be taken over by the form and the value will lose efficacy. |