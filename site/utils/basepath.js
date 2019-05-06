const reg = /(\/[c|e]n)/

const getBasePath = () => {
  const { pathname } = window.location
  const matchs = reg.exec(pathname) || { index: 0 }
  return pathname.substring(0, matchs.index + 3)
}

export default getBasePath
