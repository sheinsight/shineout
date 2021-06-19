# Progress

<example />

## API 

| Property | Type | Default | Description | version |
| --- | --- | --- | --- | --- |
| background | string | '#e9ecef' | Background color | |
| className | string | - | Extend className | |
| children | string \| ReactNode | - | Content | |
| color | string \| { from: string, to: string} \| { '0%': string, '100%': string} | primary | The foreground color can be set to the object to become a gradient.  | gradient: 1.4.2 |
| shape | string | 'line' | Options:  \['line', 'circle'] | |
| size | number | 100 | The width and height of 'circle' shape. | |
| strokeWidth | number | 8 | The width of the stroke | |
| style | object | - | Container element style | |
| type | string | - | Built-in color, options: \['success', 'info', 'warning', 'danger'] | |
| value | number | 0 | Percentage, 0 <= value <= 100 | |
| popup | boolean | false | show children with popup | |