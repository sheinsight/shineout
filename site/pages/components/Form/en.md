# Form

<example />

## API

### Form
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | | extend className |
| value | object | | Form value |
| datum | object | | The formdata helper class, which is created automatically inside a Form without setting it, usually does not need to be set. |
| disabled | boolean | false | When disabled is true, all the elements in the form are disabled. |
| inline | boolean | false | When inline is true, the form is horizontal layout |
| labelAlign | 'top' \| 'right' | | the default value is right |
| labelWidth | string \| number | 140px | The width of label. It is invalid when labelAlign is 'top'. |
| mode | string | | mode, with mode |
| onChange | (data: any) => void | | callback function, executed when the value is changing |
| onError | (err: Error) => void | | callback when the error happens |
| onSubmit | (data: any) => void | | the function for Form Submission.  When the internal validation fails, it will not be triggered. |
| removeUndefined | boolean | true | When removeUndefined is true, remove undefined value on submit. |
| rules | object | | validation rules, see details in the Rules |
| scrollToError | boolean \| number | | When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top |
| style | object | - | Container element style |
| throttle | number | 1000 | ms, the interval between two submissions(Prevent repeat submission) |
| initValidate | boolean | false | validate after set value |
| formRef | (form: any) => void | - | bind form ref, Can call some form methods | 
| labelVerticalAlign | 'top' \| 'middle' \| 'bottom' | 'top' | default is top align |

### Form.Item
Used to layout, display labels, tips, errors, etc

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| label | string \| ReactNode | undefined | When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''. |
| labelAlign | 'top' \| 'right' | | the default value is left. |
| labelWidth | string \| number | 140px | The width of label. It is invalid when labelAlign is 'top'. |
| required | boolean | false | Required tags for pure display. Do not trigger validation |
| tip | string | | Prompting information |

### Form.Field
Used to handle custom form components, enabling custom form components to get/store/validate value from formdata by name.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bind | string[] | - | bind name, render while the name change |
| children | (opts: object) => ReactNode \| ReactNode | required | React components that support value and onChange or function. The function object attribute is as follows: <br />value: The value obtained from the parent Form or Form.Block by name.<br />error: the error information of data validation. type is Error.<br />onChange: The callback when the value is changing. |
| defaultValue | string \| number | | default value |
| name | string | none | The name of a Form that accesses data |
| rules | any[] | none | Validation rules | 

### Form.FieldSet
Handle a set(group) data from form by name.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | (opts: object) => ReactNode \| ReactNode | required | When children type is not function, handle a set data type of object, When children type is function, handle a group of data type of array. options property: <br />list: all data of name <br />value：a single piece of data for the value obtained by name <br />onChange：a callback when the value is changing <br />onRemove：a callback when a child component is removed <br />index：the current index <br />onInsert: Insert a piece of data before the current item <br />onAppend: Insert a piece of data after the current item |
| defaultValue | string \| number | | Default value |
| empty | (onInsert: any) => ReactNode | | . |
| name | string | required | The name that accesses data from from |
| rules | any[] | none | Validation rules | 

### Form.Flow

Used to process interactive data.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | (datum: any) => ReactNode | required | datum is the object of Datum.Form. |
| names | string[] | none | Specifying which fields to change trigger the Flow update. |

### FormRef

| Property | Type | Default | Description | Version |
| --- | --- | --- | --- | -- |
| getValue | () => any | - | Returns the value of the form | 1.4.4 |
| validate | () => void | - | Validation form | 1.4.4 |
| clearValidate | () => void | - | Clear check | 1.4.4 |
| reset | () => void | - | Reset form | 1.4.4 |
| submit | (withValidate: boolean) => void | - | Submit Form, withValidate: Whether to verify | 1.4.4 |

### Submit, Reset, Button
Same as [Button](/components/Button)


### ~~Form.Block~~ out of date

Use to resolve nested data

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| labelWidth | string \| number | 140px | the width of the label. It is invalid when labelAlign is 'top'. |
| onChange | function(value) | required | a callback when the value is changing | 
| value | any | required | value |

### ~~Form.BlockField~~ out of date

Merge Form.Field and Form.Block

### ~~Form.Loop~~ out of date

Used to iterate through the values of the array type and generate the child components.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | function(options) :ReactElement | required | options property: <br />list: all data of name <br />value：a single piece of data for the value obtained by name <br />onChange：a callback when the value is changing <br />onRemove：a callback when a child component is removed <br />index：the current index <br />onInsert: Insert a piece of data before the current item <br />onAppend: Insert a piece of data after the current item |
| name | string | required | Get the key of the value from the upper form, and the type of data must be Array. |
