# Data.Form

The auxiliary class of Form that process data for collecting and distributing data to input components.

## Sample

<code name="example" />

See the actual use in [Form](#/components/Form)

## Init parameters

### removeUndefined *boolean*

Whether to remove the data whose value is undefined. Its default value is true.

### onChange *function(data)*

The callback function when the value is changing

## function

### getValue *function():object*
Get all object values of the current form.

### setValue *function(object)*
Set value and new value will replace the current value。

### set *fuction(name, value)*
Set data.

### get *fuction(name)*
Get a single field value.