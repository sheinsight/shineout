# Popover

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| background | string | '#fff' | pop-up background-color(with arrows) |
| border | string | '#dee2e6' | the color of pop-up border(with arrows) |
| className | string | none | extend className |
| children | ReactElement | required | The child element can only be one ReactElement. |
| content | ReactElement \| function | required | pop-up content | 
| position | string | 'top' | the position of pop-up layer, options:  \['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'] |
| style | object | none | the outermost extension style |
| type | string | none | options: \['success', 'info', 'warning', 'danger'] |