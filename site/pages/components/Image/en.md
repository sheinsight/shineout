# Image

The image component is used to process images of a specified size, to realize the functions of occupation, exception handling, stretching, filling, and lazy loading.

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | extend className |
| height | string \| number | '100%' | the height of the image(When the value is percentage, the ratio is the width of the image) |
| href | string | none | original picture address |
| lazy | bool | false | whether to delay loading |
| src | string | required | the picture address |
| style | object | none | the outermost extension style |
| target | string | '_modal' | options: \['_modal', '_blank', '_self'] |
| width | string \| number | '100%' | the width of the image |

### Image.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| height | string \| number | '100%' | the height of single image(When the value is percentage, the ratio is the width of the image) |
| lazy | bool | false | whether to delay loading |
| pile | bool | false | whether to stack |
| target | string | '_modal' | options: \['_modal', '_blank', '_self'] |
| width | string \| number | '100%' | the width of single picture |