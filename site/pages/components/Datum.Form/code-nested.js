import { Datum } from 'shineout'

const datum = new Datum.Form({ flatten: true })

const user = {
  email: 'test@123.com',
  account: {
    name: {
      firstName: 'Harry',
      lastName: 'Potter',
    },
    age: 17,
  },
}

datum.setValue(user)
console.log(datum.get('account.name.firstName'))
console.log(datum.get('account.age'))
console.log(datum.getValue())
