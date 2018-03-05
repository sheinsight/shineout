import { Datum } from 'shineout'
import data from './data'

let datum = new Datum.List({ format: 'id', value: [2, 3] })
datum.addValue(data[5])
console.log(datum.getValue())

datum = new Datum.List({ format: 'name', separator: ',', value: 'red,yellow' })
datum.addValue(data[5])
console.log(datum.getValue())
datum.removeValue(data[2])
console.log(datum.getValue())

datum = new Datum.List({ format: 'name', separator: '|', value: 'red|yellow' })
datum.addValue(data[5])
console.log(datum.getValue())
