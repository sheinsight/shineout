# Form

<example />

## API

### Form
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | | extend className |
| datum | object \| Datum.Form | | The formdata helper class, which is created automatically inside a Form without setting it, usually does not need to be set. |
| disabled | bool | false | When disabled is true, all the elements in the form are disabled. |
| inline | bool | false | When inline is true, the form is horizontal layout |
| labelAlign | string | | options:  \['top', 'right'], the default value is left. |
| labelWidth | string \| number | 140px | The width of label. It is invalid when labelAlign is 'top'. |
| onChange | function(data) | | callback function, executed when the value is changing |
| onError | function(err) | | callback when the error happens |
| onSubmit | function(data) | | the function for Form Submission.  When the internal validation fails, it will not be triggered. |
| rules | object | | validation rules, see details in the Rules |
| style | object | - | Container element style |
| throttle | number | 1000 | ms, the interval between two submissions(Prevent repeat submission) |

### Rules
Validation rules, format: { name: \[ rule ] }

The name corresponds to the name attribute of the component in the form.

There are 5 rules, priority is as follow:

- Function:Completely controlled by the caller. you can theoretically do all the checking.
  ```
  /**
   value - Current component value
   formdata - All values in the form 
   callback - The result of verification
   */ 
  (value, formdata, callback) => {
    if (/\d+/.test(value)) callback(true)
    else callback(new Error('Password at least has one numeral.'))
  }
  // return a Promise，do not call callback
  (value) => new Promise((resolve, reject) => {
    if (/\d+/.test(value)) resolve(true)
    else reject(new Error('Password at least has one numeral.'))
  }
  ```

- Required:Determine whether the required attribute is true or not. false is not required when it is not required.
  ```
  { required: true, message: 'Please enter password.' }
  ```

- Length:Judge by the min or max property.
  ```
  { min: 7, message: 'Password must be at least 7 characters.' }
  ```

- RegExp: Judge by the RegExp. It can be a RegExp object or a string.
  ```
  { regExp: /[a-z]+/i, message: 'Password at least has one letter.' }
  ```

- Type: Some common type validation are built in. 
  ```
  { type: 'email', message: 'Please enter a valid email.' }
  ```

#### Rule

| Property | Type | Description |
| --- | --- | --- | --- |
| required | bool | whether to be required |
| min | number | The minimum value. When type is 'number', validate the value. Otherwise, validate the value.length.  |
| max | number | The maximum value. When type is 'number', validate the value. Otherwise, validate the value.length. |
| regExp | string \| RegExp | regular expression |
| type | string | options: \[ 'email', 'json', 'url', 'hex', 'number' ]. You can customize the regExp validation if it does not support it. |
| message | string | The error message. You can use the '{key}' symbol to format. Key is a property of the current rule, such as {min: 20, message: 'minimum value is {min}'}, which is formatted as 'minimum value is 20'. |

### Form.Item
Used to layout, display labels, tips, errors, etc

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| label | string \| ReactElement | undefined | When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''. |
| required | boolean | false | Required tags for pure display. Do not trigger validation |
| tip | string | | Prompting information |

### Form.Field
Used to handle custom form components, enabling custom form components to get/store/validate value from formdata by name.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | ReactElement\|function(object) | required | React components that support value and onChange or function. The function object attribute is as follows: <br />value: The value obtained from the parent Form or Form.Block by name.<br />error: the error information of data validation. type is Error.<br />onChange: The callback when the value is changing. |
| defaultValue | string \| number | | defaul value |
| name | string | none | The name of a Form that accesses data |
| rules | array | none | Validation rules | 


### Form.Block

Use to resolve nested data

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| labelWidth | string \| number | 140px | the width of the label. It is invalid when labelAlign is 'top'. |
| onChange | function(value) | required | a callback when the value is changing | 
| value | any | required | value |

### Form.BlockField

Merge Form.Field and Form.Block

### Form.Loop

Used to iterate through the values of the array type and generate the child components.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | function(options) :ReactElement | required | options property: <br />list: all data of name <br />value：a single piece of data for the value obtained by name <br />onChange：a callback when the value is changing <br />onRemove：a callback when a child component is removed <br />index：the current index <br />onInsert: Insert a piece of data before the current item <br />onAppend: Insert a piece of data after the current item |
| name | string | required | Get the key of the value from the upper form, and the type of data must be Array. |

### Form.Flow

Used to process interactive data.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | function(datum) :ReactElement | required | datum is the object of Datum.Form. |
| names | array | none | Specifying which fields to change trigger the Flow update. |

### Submit, Reset, Button
Same as [Button](#/components/Button)
