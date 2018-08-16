# Radio

<example />

## API

Radio cannot be used alone.

### Radio.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | any | | default value. |
| data | array | required | the data items |
| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](#/components/Datum.List) object or the Datum.List configuration to process data. |
| disabled | bool \| function | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| format | string \| function | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d[format]<br />When it is a function, the result returned by the function will be the value. |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| name | string | none | The name of a Form that accesses data |
| onChange | function(value) | none | value is the datum.getValue() |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match. |
| renderItem | string \| function(d) | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| value | any | | In the Form, value is taken over by the Form and the value will be invalid. |