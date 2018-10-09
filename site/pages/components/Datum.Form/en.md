# Data.Form

The auxiliary class of Form that process data for collecting and distributing data to input components.

## Example

<code name="example" />

<br />

See the example use in [Form](#/components/Form)

## Arguments

### removeUndefined *boolean*

Whether to remove the data whose value is undefined. The default value is true.

### onChange *function(data)*

The callback function when the value is changing.

### value *object*

The initial value.

## Methods

### getValue *function():object*
Get all values of the current form.

### setValue *function(object)*
Set new value, will replace the current value。

### set *fuction(name, value)*
Set the value specified by name.

### get *fuction(name)*
Get a single field value.

### validateFields *function(names)*
Verify specified fields.

### validateClear *function()*
Clear the validate result.