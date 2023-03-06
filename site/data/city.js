import { shuffle } from '../utils/faker'
import citys from '../utils/faker/city'

const allData = shuffle(citys).map((city, i) => ({ id: i + 1, city }))

export function fetchSync(count = 100, start = 0) {
  return allData.slice(start, start + count)
}

export const fCitys = fetchSync(10)
