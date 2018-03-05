import { Datum } from 'shineout'
import data from './data'

const datum = new Datum.List({
  format: 'name',
  separator: ',',
  prediction: (val, d) => val === d.name,
  value: 'blue',
  onChange: (values) => {
    console.log(values)
  },
})
datum.addValue(data[1])
datum.addValue(data[2])
datum.removeValue(data[2])
datum.clear()
datum.setValue('red,violet')
datum.addValue(data[2])
