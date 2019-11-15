# Upload

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| accept | string | none | The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)  |
| action | string | required | The address for uploading |
| children | any | required | Upload placeholder |
| className | string | none | Extend className |
| headers | object | none | Request headers |
| htmlName | string | none | The filename received by the server. If it is not filled in, use the name. |
| limit | number | 100 | Maximum number of uploaded files |
| disabled | bool | false | disabled upload action | 
| name | string | none | The key access data in the Form  |
| request | func(options) | - | Custom upload method<br /> options: the options of upload |
| onChange | func(values) | none | The callback function when the value is changing(Upload successfully, delete)<br />values: Array, the value is the onSuccess returns |
| onSuccess | func(res, file, data, xhr):value | none | The callback function when to upload successfully. The returned result is as the new value. <br />res: the result that the upload interface returns<br />file: selected file<br /> data: the request data<br /> xhr: reponse |
| onHttpError | func(xhr):string | none | The callback function when to upload unsuccessfully. The returned result is as the error message. |
| params | object | none | Additional parameters submitted to the server |
| recoverAble | bool | true | Whether to recover deleted values. |
| renderResult | func | a => a | Display results |
| request | func | - | Custom request method |
| validator | object | none | Check file before uploading |
| value | array | \[] | value |
| withCredentials | bool | false | Whether to take the cookie |
| multiple | bool | false | Whether multi-select files are supported |
| renderContent | func(res, value, index, values) | - | Custom content of result  | 
| validatorHandle | bool \| func(error, file) | true | Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function. |
| drop | bool | false | drop to update |

### options 

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| file |  object | - |  the file |
| onLoad | string | - | the event of uploading |
| onError | any | - | the event of upload fail(in props is onHttpError) |
| onProgress | string | - | the event of uploading progress |
| onSuccess | array | - | the event of upload successing |
| params | object | - | the request params |
| onStart | object | - | the event of start upload |
| headers | object | - | the request header |

### Image

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | any | none | The content of the upload button. It can be empty. |
| renderResult | func | a => a | Return the link address of the url of the image.|


### Validator

| Property | Type | Description |
| --- | --- | --- |
| ext | func(string):Error | Judge the file extension, return the Error when the verification fails. |
| size | func(number):Error | Judge the size of the file and return the Error when the verification fails. |
| imageSize | func(Image):Error | It is only valid for Image to determine the size of images and return the Error when the verification fails. |

### Button

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| type | string | primary | options: \['primary', success', 'info', 'warning', 'danger'\] |
| placeholder | string \| ReactElement | none | button default content |
| loading | string \| ReactElement | none | content of uploading, will have spin if a string |
