import { Datum } from 'shineout'
import data from './data'

const datum = new Datum.List({
  format: d => d.name,
  onChange(value) { console.log(value) },
})

datum.setValue(['blue'])
datum.add(data.red)
datum.add(data.orange)
datum.remove(data.red)
datum.clear()
