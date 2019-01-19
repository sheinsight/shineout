import { pickUnique, shuffle } from '../utils/faker'
import firstNames from '../utils/faker/firstName'
import lastNames from '../utils/faker/lastName'

const fns = pickUnique(firstNames, 100)
const lns = pickUnique(lastNames, 100)

const names = []
fns.forEach(fn => {
  lns.forEach(ln => {
    names.push(`${fn} ${ln}`)
  })
})

const allData = shuffle(names).map((name, i) => ({ id: i + 1, name }))

export function fetchSync(count = 100, start = 0) {
  return allData.slice(start, start + count)
}
