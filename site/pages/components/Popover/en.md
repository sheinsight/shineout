# Popover

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| background | string | '#fff' | Pop-up background-color(with arrows) |
| border | string | '#dee2e6' | The color of pop-up border(with arrows) |
| className | string | - | Extend className |
| children | ReactElement | required | The child element can only be one ReactElement. |
| content | ReactElement \| function | required | Pop-up content | 
| position | string | 'top' | The position of pop-up layer, options:  \['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'] |
| style | object | - | The pop-up container style |
| trigger | string | 'hover' | options: \['click', 'hover'] |
| type | string | none | Options: \['success', 'info', 'warning', 'danger'] |