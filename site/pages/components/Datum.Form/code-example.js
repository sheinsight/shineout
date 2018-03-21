import { Datum } from 'shineout'

const datum = new Datum.Form()

datum.setValue({ email: 'test@123.com' })
datum.set('age', 20)
console.log(datum.get('age'))
console.log(datum.getValue())
