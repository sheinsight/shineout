import { Datum } from 'shineout'

const datum = new Datum.Form()

datum.setValue({ email: 'test@123.com', name: { lastName: 'Potter' }, favors: ['red', 'yellow'] })
datum.set('age', 20)
datum.set('name.firstName', 'Harry')
console.log(datum.get('age'))
console.log(datum.get('name'))
console.log(datum.get('name.firstName'))
console.log(datum.get('name.lastName'))
console.log(datum.get('favors.[1]'))
datum.set('favors.[2]', 'blue')
console.log(datum.get('favors'))
console.log(datum.getValue())
