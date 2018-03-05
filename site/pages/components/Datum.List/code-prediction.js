import { Datum } from 'shineout'
import data from './data'

const datum = new Datum.List({
  format: 'id',
  separator: ',',
  prediction: (val, d) => parseInt(val, 10) === d.id,
  value: '2,3',
})
datum.add(data.red)
console.log(datum.getValue())
datum.remove(data.orange)
console.log(datum.getValue())
