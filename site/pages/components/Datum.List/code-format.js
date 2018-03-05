import { Datum } from 'shineout'
import data from './data'

let datum = new Datum.List({})
datum.addValue(data[1])
console.log(datum.getValue())

datum = new Datum.List({ format: d => d.name })
datum.addValue(data[1])
console.log(datum.getValue())

datum = new Datum.List({ format: d => `${d.id}-${d.name}` })
datum.addValue(data[1])
datum.addValue(data[3])
console.log(datum.getValue())
