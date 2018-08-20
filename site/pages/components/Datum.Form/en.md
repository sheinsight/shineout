# Data.Form

The auxiliary class of Form that process data for collecting and distributing data to input components.

## Sample

<code name="example" />

See the example use in [Form](#/components/Form)

## Arguments

### removeUndefined *boolean*

Whether to remove the data whose value is undefined. Its default value is true.

### onChange *function(data)*

The callback function when the value is changing

## Methods

### getValue *function():object*
Get all object values of the current form.

### setValue *function(object)*
Set value and new value will replace the current value。

### set *fuction(name, value)*
Set data.

### get *fuction(name)*
Get a single field value.