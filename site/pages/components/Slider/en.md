# Slider

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | number\|array\[number] | - | defaultValue |
| formatScale | function\|false | v => v | Format displayed scale. When it is false, the scale is not displayed. |
| formatValue | function\|false | v => v | Format displayed current value. When it is false, the current value is not displayed. |
| height | number | 200 | height. Only effect when vertical is true |
| onChange | function | - | The callback function when the value is changing. |
| scale | array\[number] | \[0, 100] | Value range. An array whose length is greater than 2. |
| step | number | 1 | Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected. |
| value | number\|array\[number] | - | current value |
| vertical | bool | false | Whether to be vertical |
| autoHide | bool | false | Automatically hides the current value and scale |
| disabled | bool | false | Disable component |
| range | bool | false | Whether to display double slider |
| onIncrease | func | - | Drag over the maximum event |
