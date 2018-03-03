import { Datum } from 'shineout'
import data from './data'

const datum = new Datum.List({
  format: 'id',
  separator: ',',
  prediction: (val, d) => parseInt(val, 10) === d.id,
  value: '2,3',
})
datum.addValue(data[5])
console.log(datum.getValue())
datum.removeValue(data[2])
console.log(datum.getValue())
