const iconStr = `import { Icon } from 'shineout/dist/shineout.min.js'
const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
export default Icon(url, 'FontAwesome', 'fa')
`

const cssStr = `@keyframes indicator-rise {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
div.indicator {
  text-align: center;
  user-select: none;
}
div.indicator-item {
  margin-right: 10px;
  float: left;
  width: 36px;
  height: 30px;
  font-size: 20px;
  color: #ffffff50;
  cursor: pointer;
}
div.indicator-item.active {
  color: #fff;
}
div.indicator .indicator-progress {
  position: relative;
}
div.indicator .indicator-progress > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
}
div.indicator .indicator-progress .bg {
  width: 100%;
  background: #ffffff50;
}
div.indicator .indicator-progress .fg {
  width: 0;
  background: #ffffff;
}
`

const fetch = all => `import immer from 'immer'
let allData = ${JSON.stringify(all, null, 2)}

function pickNumber(max = 65555, min = 0, fixed = 2) {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = Math.random() * (max - min) + min
  return parseFloat(num.toFixed(fixed), 0)
}

function pickInteger(...args) {
  return Math.round(pickNumber(...args))
}

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
    data = data.filter(d => \`\${d.firstName} \${d.lastName}\`.toLocaleLowerCase().indexOf(username) >= 0)
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
}`

export { cssStr, iconStr, fetch }
