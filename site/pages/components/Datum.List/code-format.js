import { Datum } from 'shineout'
import data from './data'

let datum = new Datum.List({})
datum.add(data.red)
console.log(datum.getValue())

datum = new Datum.List({ format: d => d.name })
datum.add(data.red)
console.log(datum.getValue())

datum = new Datum.List({ format: d => `${d.id}-${d.name}` })
datum.add(data.red)
datum.add(data.green)
console.log(datum.getValue())
