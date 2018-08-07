# Form

The Form is a complex component that consists of the following components:

- **Form：** From
- **Form.Item：** Form items for layout, display labels, prompt copy information, etc.
- **Form.Field：** Used to handle custom components, implement rules validation, and store data functions.
- **Form.Block：** A form block for accessing multilevel nested data.
- **Form.BlockField：** A shortcut component incorporating Field and Block.
- **Form.Loop：** Used to iterate through the values of the array type to generate subcomponents.
- **Form.Flow：** Data flow for handling data linkage.

- **Form.Submit：** The shortcut of Submit button. When you use Submit, the enter key triggers the form submission.
- **Form.Reset：** The shortcut of Reset button.
- **Form.Button：** Same as the submit button. When you use the Button, the enter key does not trigger a form submission.

<example />

## API

### Form
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | | extend className |
| datum | object \| Datum.Form | | The formdata helper class, which is created automatically inside a Form without setting it, usually does not need to be set. |
| disabled | bool | false | determine whether the Form is disabled. When it is true, all the elements in the form are disabled. |
| inline | bool | false | determine whether to be horizontal layout |
| labelAlign | string | | options:  \['top', 'right'], the default value is left. |
| labelWidth | string \| number | 140px | the width of label. It is invalid when labelAlign is 'top'. |
| onChange | function(data) | | a callback function, can be executed when the value is changing |
| onError | function(err) | | a callback when the error happens |
| onSubmit | function(data) | | the function for Form Submission.  When the internal validation fails ,it will not be triggered. |
| rules | object | | validation rules, see details in the Rules |
| style | object | | extended style |
| throttle | number | 1000 | ms, the interval between two submissions(Prevent repeat submission)|

### Rules
Validation rules, format: { name: \[ rule ] }

- The name corresponds to the name attribute of the component in the form.
- Each rule handles only one attribute. For example, required, regExp, and min are set at the same time, but only required is handled. Multiple judgments require multiple rules to be set.

There are 5 rules, which are as follows according to priority:

- Function:Completely controlled by the caller. you can theoretically do all the checking.
- Required:Determine whether the required attribute is true or not. false is not required when it is not required.
- Length:Judge by the min or max property.
- RegExp:Judge by the RegExp. It can be a RegExp object or a string.
- Type:Built-in types are commonly judged by regular expression. When requirements are not met, you can customize regular expressions or use functional validation.

#### function(value, formdata, callback) : Promise

- value: Current component value
- formdata: All component values in the form
- callback(true|Error): The result of verification.The success is true and the failure is an Error object. If the function returns a Promise, do not call callback.


#### object

| Property | Type | Description |
| --- | --- | --- | --- |
| required | bool | whether to be required |
| min | number | The minimum value. When type is 'number', the value is judged and the length of other types is judged. |
| max | number | The maximum value. When type is 'number', the value is judged and the length of other types is judged. |
| regExp | string \| RegExp | regular expression |
| type | string | Type checking.options: \[ 'email', 'json', 'url', 'hex', 'number' ]. You can customize the regExp validation if it does not support it. |
| message | string | The error message. You can use the '{key}' symbol to format. Key is a property of the current rule, such as {min: 20, message: 'minimum value is {min}'}, which is formatted as 'minimum value is 20'. |

### Form.Item
Form items, are mainly used to layout, display labels, prompt copy information, etc

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| label | string \| ReactElement | undefined | When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''. |
| required | boolean | false | Required tags for pure display. Do not trigger validation |
| tip | string | | Prompting information |

### Form.Field
Used to handle custom form components, enabling custom form components to implement data storage capabilities through rules validation.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | ReactElement\|function(object) | required | React components that support value and onChange or function. The function object attribute is as follows: <br />value: The value obtained from the parent Form or Form.Block by name.<br />error: the error information of data validation. type is Error.<br />onChange: The callback when the value is changing. |
| defaultValue | string \| number | | defaul value |
| name | string | none | The name of a Form that accesses data |
| rules | array | none | Validation rules | 
| value | string \| number | | The defaultValue and the value can be set at the same time and the defaultValue will be overridden by the value in the Form. The value will be taken over by the Form and the value will be invalid. |


### Form.Block

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| labelWidth | string \| number | 140px | the width of the label. It is invalid when labelAlign is 'top'. |
| onChange | function(value) | required | a callback when the value is changing | 
| value | any | required | value |

### Form.BlockField

同 Form.Field

### Form.Loop

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | function(options) :ReactElement | required | options property: <br />list: all data of name <br />value：a single piece of data for the value obtained by name <br />onChange：a callback when the value is changing <br />onRemove：a callback when a child component is removed <br />index：the current index <br />onInsert: Insert a piece of data before the current item <br />onAppend: Insert a piece of data after the current item |
| name | string | required | Get the key of the value from the upper form, and the type of data must be Array. |

### Form.Flow

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | function(datum) :ReactElement | required | datum is the object of Datum.Form. |
| names | array | none | When names are empty, any changes in values within the Form will trigger Flow updates. Instead of null, only the changes of the specified field  are monitored |

### Submit, Reset, Button
Same as [Button](#/components/Button)
