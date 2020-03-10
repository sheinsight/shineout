# Slider

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | number \| number[] | - | defaultValue |
| formatScale | (v: number) => boolean \| false | v => v | Format displayed scale. When it is false, the scale is not displayed. |
| formatValue | (v: number) => boolean \| false | v => v | Format displayed current value. When it is false, the current value is not displayed. |
| height | number | 200 | height. Only effect when vertical is true |
| onChange | (v: any) => void | - | The callback function when the value is changing. |
| scale | number[] | \[0, 100] | Value range. An array whose length is greater than 2. |
| step | number | 1 | Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected. |
| value | number \| number[] | - | current value |
| vertical | boolean | false | Whether to be vertical |
| autoHide | boolean | false | Automatically hides the current value and scale |
| disabled | boolean | false | Disable component |
| range | boolean | false | Whether to display double slider |
| onIncrease | (v: number) => boolean | - | Drag over the maximum event |
