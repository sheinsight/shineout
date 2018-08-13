# Select

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| absolute | bool | false | When it is true, the pop-up layer of option renders independently in the DOM. |
| clearable | bool | false | whether to be cleared |
| data | array | required | data item, A single piece of data as value must be unique. |
| datum | object | none | If the format and prediction propertt do not meet the requirements, you can pass in a [Datum.List](#/components/Datum.List) object or the Datum.List configuration to process data. |
| defaultValue | array | | Initial value |
| disabled | bool | false | Whether to disable |
| filterDelay | number | 400 | ms. The delay of user input triggering filter events |
| format | string \| function | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d[format]<br /> When it is a function, the result returned by the function will be the value. |
| name | string | none | The name of a Form that accesses data |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | function(value) | none | value is the datum.getValue(). |
| onCreate | function \| bool | none | If the onCreate event is set, the component is in an input state.<br />When onCreate is a function, the return value of this function is debunked at the top as a new option.<br />When onCreate is true, use the fault functuon text => text. |
| onFitler | function | none | When the onFilter is not empty, you can enter filtering data.<br />If the onFilter returns a function, use this function as a front-end filter.<br />If not, you can do your own backend filtering. |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | string \| function(d) | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| renderResult | string \| function(d) | renderItem | The content displayed in the result after selecting is the same as renderItem by default |
| value | array | | In the Form, the value will be taken over by the form and the value will be invalid. |
