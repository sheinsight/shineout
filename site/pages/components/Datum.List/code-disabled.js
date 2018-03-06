import { Datum } from 'shineout'
import data from './data'

const datum = new Datum.List({
  disabled: d => d.name === 'blue' || d.name === 'red',
  format: d => d.name,
  onChange(value) { console.log(value) },
})

datum.setValue(['red'])
datum.add([data.orange, data.blue]) // orange, blue
datum.remove([data.orange, data.red]) // orange, red
