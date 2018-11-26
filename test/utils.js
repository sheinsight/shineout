import test from 'ava'
import { range } from '../src/utils/numbers'

export const repeat = (count, val) => range(count).map(() => val)

export const createCases = (t, cases, result) => new Promise(async (resolve) => {
  t.deepEqual(await Promise.all(cases), result)
  resolve(true)
})

test('nothing', (t) => { t.pass() })
