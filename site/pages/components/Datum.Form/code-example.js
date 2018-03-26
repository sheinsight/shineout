import { Datum } from 'shineout'

const datum = new Datum.Form()

datum.setValue({ email: 'test@123.com', name: { lastName: 'Potter' } })
datum.set('age', 20)
datum.set('name.firstName', 'Harry')
console.log(datum.get('age'))
console.log(datum.get('name'))
console.log(datum.get('name.firstName'))
console.log(datum.get('name.lastName'))
console.log(datum.getValue())
