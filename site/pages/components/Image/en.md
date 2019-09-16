# Image

<example />

## API

| Property | Type | Default | Description | version | 
| --- | --- | --- | --- | --- |
| className | string | none | extend className | |
| height | string \| number | '100%' | the height of the image(When the value is percentage, the ratio is the width of the image) | |
| href | string | none | original picture address | |
| lazy | bool | false | whether to delay loading | |
| src | string | required | the picture address | |
| style | object | - | Container element style | |
| target | string | '_modal' | options: \['_modal', '_blank', '_self', '_download'] | |
| width | string \| number | '100%' | the width of the image | |
| placeholder | ReactElement \| string | 'loading' | loading image placeholder content | |
| container | string | - | the special element selector witch container the lazy image, such as: '#id', '.class' | 1.4.2 |

### Image.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| height | string \| number | '100%' | the height of single image(When the value is percentage, the ratio is the width of the image) |
| lazy | bool | false | whether to delay loading |
| pile | bool | false | whether to stack |
| target | string | '_modal' | options: \['_modal', '_blank', '_self'] |
| width | string \| number | '100%' | the width of single picture |
