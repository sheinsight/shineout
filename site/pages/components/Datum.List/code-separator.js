import { Datum } from 'shineout'
import data from './data'

const onChange = value => console.log(value)

let datum = new Datum.List({ format: 'id', value: [2, 3], onChange })
datum.add(data.red)

datum = new Datum.List({
  format: 'name', onChange, separator: ',', value: 'red,yellow',
})
datum.add(data.blue)
datum.remove(data.yellow)

datum = new Datum.List({
  format: 'name', onChange, separator: '|', value: 'red|yellow',
})
datum.add(data.cyan)
