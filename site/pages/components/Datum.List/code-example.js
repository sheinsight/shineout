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
datum.add(data.orange)
datum.add(data.green)
datum.remove(data.green)
datum.clear()
datum.setValue('red,violet')
datum.add(data.cyan)
