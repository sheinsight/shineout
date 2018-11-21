# Select

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| absolute | bool | false | When it is true, the pop-up layer of option append into document.body. |
| clearable | bool | false | If clearable is true, show clear value icon |
| data | array | required | Options data |
| defaultValue | array | | Initial value |
| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](#/components/Datum.List) object or the Datum.List configuration to process data. |
| disabled | bool \| function | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| filterDelay | number | 400 | ms. The delay of user input triggering filter events |
| format | string \| function | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format]<br />When it is a function, use its return value. |
| name | string | - | The name of a Form that accesses data |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | function(value) | - | value is the datum.getValue(). |
| onCreate | function \| bool | - | If the onCreate event is set, the component is inputable.<br />When onCreate is a function, the return value of this function is diaplay at the top as a new option.<br />When onCreate is true, use the built-in functuon text => text. |
| onFilter | function | - | When the onFilter is not empty, you can filter data by input.<br />If the onFilter returns a function, use this function as a front-end filter.<br />If return undefined, you can do your own backend filtering. |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | string \| function(d) | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| renderResult | function(d) | renderItem | The content displayed in the result after selecting, if not set, use renderItem |
| value | array \| string \| object | | In the Form, the value will be taken over by the form and the value will be invalid. |
