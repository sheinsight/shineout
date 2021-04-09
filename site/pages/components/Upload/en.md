# Upload

<example />

## API

### Upload

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| accept | string | none | The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)  |
| action | ((file: File) => string) \| string | required | The address for uploading |
| children | ReactNode | required | Upload placeholder |
| className | string | none | Extend className |
| defaultValue | any[] | -  | default value |
| headers | object | none | Request headers |
| htmlName | string | none | The filename received by the server. If it is not filled in, use the name. |
| limit | number | 100 | Maximum number of uploaded files |
| disabled | boolean | false | disabled upload action | 
| name | string | none | The key access data in the Form  |
| request | (options: object) => void | - | Custom upload method<br /> options: the options of upload |
| onChange | (values: any[]) => void | none | The callback function when the value is changing(Upload successfully, delete)<br />values: Array, the value is the onSuccess returns |
| onSuccess |  (res: string, file: File, data: any, xhr: any) => any | none | The callback function when to upload successfully. The returned result is as the new value. <br />res: the result that the upload interface returns<br />file: selected file<br /> data: the request data<br /> xhr: reponse |
| onHttpError | (xhr: any) => string | none | The callback function when to upload unsuccessfully. The returned result is as the error message. |
| params | object | none | Additional parameters submitted to the server |
| recoverAble | boolean | true | Whether to recover deleted values. |
| renderResult | (data: any) => ReactNode | a => a | Display results |
| validator | object | none | Check file before uploading |
| value | any[] | \[] | value |
| withCredentials | boolean | false | Whether to take the cookie |
| multiple | boolean | false | Whether multi-select files are supported |
| renderContent | (res: any, value: any, index: number, values: any[]) => ReactNode | - | Custom content of result  | 
| validatorHandle | ((error: any, file: File) => boolean) \| boolean  | true | Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function. |
| drop | boolean | false | drop to update |
| filesFilter | (fileList: any[]) => boolean | none | Filter after file selection, users can customize the list of files that need to be uploaded eventually<br />Need to return a new file list |
| onErrorRemove | (xhr: XMLHttpRequest, file: Blob) => void | none | remove update failed callback |
| forceAccept | string | none | After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept |
| showUploadList | boolean | true | show upload list |
| leftHandler | boolean | false | add image handler show left |

### Upload.Image

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | ReactNode | none | The content of the upload button. It can be empty. |
| leftHandler | boolean | false | Add image view is displayed on the left |
| renderResult | (data: any) => ReactNode | a => a | Return the link address of the url of the image.|
| onErrorRemove | (xhr: XMLHttpRequest, file: Blob) => void | none | remove update failed callback |
| onPreview | (url, value, index, values) => void | none | how to preview the image |
| ignorePreview | boolean | false | ignore image preview |

### Upload.Button

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| type | string | primary | options: \['primary', success', 'info', 'warning', 'danger'\] |
| placeholder | ReactNode | none | button default content |
| loading | ReactNode | none | content of uploading, will have spin if a string |


### UploadOptions 

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| file |  File | - |  the file |
| onLoad | function | - | the event of uploading |
| onError | function | - | the event of upload fail(in props is onHttpError) |
| onProgress | function | - | the event of uploading progress |
| onSuccess | function | - | the event of upload successing |
| params | object | - | the request params |
| onStart | function | - | the event of start upload |
| headers | object | - | the request header |

### Validator

| Property | Type | Description |
| --- | --- | --- |
| ext | func(string):Error | Judge the file extension, return the Error when the verification fails. |
| size | func(number):Error | Judge the size of the file and return the Error when the verification fails. |
| imageSize | func(Image):Error | It is only valid for Image to determine the size of images and return the Error when the verification fails. |
| customValidator | func(File):Error | custom validator |
