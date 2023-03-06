import immer from 'immer'
import { one, pick, pickDate, pickInteger, pickNumber } from '../utils/faker'
import firstNames from '../utils/faker/firstName'
import lastNames from '../utils/faker/lastName'
import position from '../utils/faker/position'
import country from '../utils/faker/country'
import city from '../utils/faker/city'

const totalCount = 10000

let allData = []
function init() {
  const offset = 5000 * 3600 * 24 * 1000
  const c20 = pick(country, 20)
  const c30 = pick(city, 30)
  const c5 = pick(city, 5)
  for (let i = 1; i <= totalCount; i++) {
    allData.push({
      id: i,
      firstName: one(firstNames),
      lastName: one(lastNames),
      position: one(position),
      start: pickDate('YYYY-MM-DD', offset),
      time: pickDate('hh:mm'),
      salary: pickInteger(500000, 50000),
      country: one(c20),
      office: one(c30),
      office5: one(c5),
      height: pickNumber(80, 200),
    })
  }

  const newFN = []
  for (let i = 0; i <= firstNames.length; i += 3) {
    newFN.push(firstNames[i])
  }
}

init()

export const all = (delay = 500) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(allData)
    }, delay)
  })

// eslint-disable-next-line
export function fetchSync(count = 100, start = 0, sorter = {}, username) {
  const { name, order } = sorter
  let sort
  switch (name) {
    case 'id':
    case 'salary':
      if (order === 'asc') sort = (a, b) => a[name] - b[name]
      else sort = (a, b) => b[name] - a[name]
      break
    default:
      if (name) {
        if (order === 'asc') sort = (a, b) => a[name].localeCompare(b[name])
        else sort = (a, b) => b[name].localeCompare(a[name])
      }
      break
  }

  let data = sort ? immer(allData, draft => draft.sort(sort)) : allData

  if (username) {
    username = username.toLocaleLowerCase()
    data = data.filter(d => `${d.firstName} ${d.lastName}`.toLocaleLowerCase().indexOf(username) >= 0)
  }

  return data.slice(start, start + count)
}

export const fetch = {
  // eslint-disable-next-line
  get(src, { current = 1, pageSize = 100, sorter, username }) {
    const start = (current - 1) * pageSize
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 1,
          data: fetchSync(pageSize, start, sorter, username),
          current,
          pageSize,
          total: allData.length,
        })
      }, pickInteger(500, 300))
    })
  },

  post(src, { op, ids }) {
    return new Promise(resolve => {
      switch (op) {
        case 'delete':
          allData = allData.filter(d => ids.indexOf(d.id) < 0)
          break
        case 'on':
        case 'off':
          allData.forEach((d, i) => {
            if (ids.indexOf(d.id) >= 0) {
              allData[i] = { ...d, status: op === 'on' }
            }
          })
          break
        default:
      }
      setTimeout(() => {
        resolve(true)
      }, pickInteger(200))
    })
  },
}
