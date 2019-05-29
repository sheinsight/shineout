module.exports = function(content) {
  let parsed = ''
  let matched
  // eslint-disable-next-line no-cond-assign
  while ((matched = /[\w-]{1,}: .*(var\([\w-]+, ([\w\d#(),. ]+)\)).*;/g.exec(content))) {
    const [line, varStr, defaultValue] = matched
    const { index } = matched
    const scaned = line.length + index
    parsed += content.substring(0, index)
    const replaced = `${line.replace(varStr, defaultValue)}\n${line}`
    parsed += replaced
    content = content.substring(scaned)
  }
  parsed += content
  return parsed
}
