# Image

<example />

## API

### Image

| Property | Type | Default | Description | version | 
| --- | --- | --- | --- | --- |
| className | string | none | extend className | |
| height | string \| number | '100%' | the height of the image(When the value is percentage, the ratio is the width of the image) | |
| href | string | none | original picture address | |
| lazy | boolean \| number | false | whether to delay loading, number to set lazy offset | |
| src | string | required | the picture address | |
| style | object | - | Container element style | |
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | target of image | |
| width | string \| number | '100%' | the width of the image | |
| placeholder | ReactNode | 'loading' | loading image placeholder content | |
| container | string | - | the special element selector witch container the lazy image, such as: '#id', '.class' | 1.4.2 |
| error | ReactNode | none | image error placeholder |  |
| autoSSL | boolean | false | auto transform protocol | 1.6.1 |
| fit | 'fill' \| 'fit' \| 'stretch' \| 'center' | - | fit the container | |
| shape | 'rounded' \| 'circle' \| 'thumbnail' | 'rounded' | shape of image | |

### Image.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| height | string \| number | '100%' | the height of single image(When the value is percentage, the ratio is the width of the image) |
| lazy | boolean | false | whether to delay loading |
| pile | boolean | false | whether to stack |
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | target of image |
| width | string \| number | '100%' | the width of single picture |
