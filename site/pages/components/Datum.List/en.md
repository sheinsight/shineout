# Data.List

 The auxiliary class that process the array values.
 
## Example

The data used in the example on this page is as follows:
```
const data = {
  red: { id: 1, name: 'red' },
  orange: { id: 2, name: 'orange' },
  yellow: { id: 3, name: 'yellow' },
  green: { id: 4, name: 'green' },
  cyan: { id: 5, name: 'cyan' },
  blue: { id: 6, name: 'blue' },
  violet: { id: 7, name: 'violet' },
}
```

<br />

<code name="example" />

## Arguments

### format  *null | string | function(d)*
The format is used to convert the original data object to the specified value.

- **null** - When it is null, the return value is the original data.
- **string** - When it is a string, it will get the value from the original data as the key, which is equivalent to (d) => d\[format].
- **function(d)** - d is the single original data.

<code name="format" />

### onChange *function(value)*
A callback function triggered when a value changes. Value is an array of the formatted data for the format function or string(separator is a string).

<code name="onchange" />

### separator *null | string*
When it is null, value is the Array format.

When it is a string, value is a string delimited by the separator.

<code name="separator" />

### prediction *function(val, d):bool*
Determine whether the value is consistent with the original data. If it is not set, this default prediction will be used:
```
(val, d) => val === format(d)
```

<code name="prediction" />

### disabled *function(d):bool*
Determines whether data items are disabled. If true, the add and remove functions will ignore this item.

<code name="disabled" />

### value *array | string*
The initial value.

## Methods

### getValue *function():array|string*
Get the current values. Return array or string depending on the separator setting.

### setValue *function(array|string)*
Set the value. The new value will replace the current value.

### add *function(array|object)*
Add data. The value is the original data before being formatted.

### remove *function(array|object)*
Remove data. The value is the original data before being formatted.

### clear *function*
Clear all data.
