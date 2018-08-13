# Data.List data processing

This is not a component, but a class that assists the component in data processing.

There are many components in the project (such as Select, Table) that need to pass in complex data,
 and some interactive data that needs to be recorded and returned for submission. This class can assist such components in doing some data formatting.
 
 
## Sample

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
<code name="example" />

## Initialize parameter

### format  *null | string | function(d)*
The format is used within the Datum to format complex data into required values, which can be null, string, and function.

- **null** - When it is null, the return value is the original data.
- **string** - When it is a string, it will get the value from the original data as the key, which is equivalent to (d) => d\[format].
- **function(d)** - d is the single original data.

<code name="format" />

### onChange *function(value)*
A callback function triggered when a value changes. Value is the formatted data for the format function.

<code name="onchange" />

### separator *null | string*
The separator. When it is null, value retains the Array format. When it is not null, value is processed as a separator delimited string.

<code name="separator" />

### prediction *function(val, d):bool*
The value after being formatted is stored in the Datum, so the prediction function is required to determine whether the stored value is consistent with the original data. If it is noe set, this default value will be used:
```
(val, d) => val === format(d)
```

Usually used when value is a string type and the data format is inconsistent.

<code name="prediction" />

### disabled *function(d):bool*
Determines whether data items are disabled. If true is returned, the add and remove functions will ignore this data.

<code name="disabled" />

### value *array | string*
The initial value can be Array or String.

## Function

### getValue *function():array|string*
Get the current value. Return array or string depending on the separator setting.

### setValue *function(array|string)*
Set the value. The new value will replace the current value.

### add *function(array|object)*
Add data. The value is the original data before being formatted, a single line, or a set of data.

### remove *function(array|object)*
Remove data. The value is the original data before being formatted, a single line, or a set of data.

### clear *function*
Clear data.
