# Upload

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| accept | string | none | The type of the upload file |
| action | string | required | The address for uploading |
| children | any | required | Upload placeholder |
| className | string | none | Extend className |
| headers | object | none | Request headers |
| htmlName | string | none | The filename received by the server. If it is not filled in, use the name. |
| limit | number | 100 | Maximum number of uploaded files |
| name | string | none | The key access data in the Form  |
| onChange | func(values) | none | The callback function when the value is changing(Upload successfully, delete)<br />values: Array |
| onSuccess | func(res, file):value | none | The callback function when to upload successfully. The returned result is as the new value. <br />res: the result that the upload interface returns<br />file: selected file |
| onError | func(xhr):string | none | The callback function when to upload unsuccessfully. The returned result is as the error message. |
| params | object | none | Additional parameters submitted to the server |
| recoverAble | bool | true | Whether to recover deleted values. |
| renderResult | func | a => a | Display results |
| request | func | - | Custom request method |
| validator | object | none | Check file before uploading |
| value | array | \[] | value |
| withCredentials | bool | false | Whether to take the cookie |


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