export default function getParameterByName(name) {
  const { search } = window.location
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(search)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// 解析查询字符串
export function getQueryStringArgs() {
  // 取得查询字符串，并去掉开头'?'
  const { search } = window.location
  const qs = search.length ? search.substring(1) : ''
  // 保存数据的对象
  const args = {}
  // 以分割符'&'分割字符串，并以数组形式返回
  const items = qs.length ? qs.split('&') : []
  let item = null
  let name = null
  let value = null
  let i = 0
  const len = items.length
  // 逐个将每一项添加到args对象中
  for (; i < len; i++) {
    item = items[i].split('=')
    const [n, v] = item
    // 解码操作，因为查询字符串经过编码的
    name = decodeURIComponent(n)
    value = decodeURIComponent(v)
    if (name.length && value.length) {
      args[name] = value
    }
  }
  return args
}

export function setParameterByName(name, value) {
  const params = getQueryStringArgs()
  if (!value) {
    delete params[name]
  } else {
    params[name] = encodeURIComponent(value)
  }
  const keys = Object.keys(params)
  if (!keys.length) return ''
  return `?${keys.map(key => `${key}=${params[key]}`).join('&')}`
}
