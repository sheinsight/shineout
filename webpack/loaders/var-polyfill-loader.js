module.exports = function(content) {
  const reg = /[\w-]{1,}: .*(var\([\w-]+, ([\w\d#(),. ]+)\)).*;/g
  const matched = Array.from(new Set(content.match(reg)))

  if (matched) {
    // eslint-disable-next-line array-callback-return
    matched.map(line => {
      const res = /[\w-]{1,}: .*(var\([\w-]+, ([\w\d#(),. ]+)\)).*;/g.exec(line)
      const varStr = res[1]
      const defaultValue = res[2]
      const replaced = `${line.replace(varStr, defaultValue)}\n${line}`
      content = content.split(line).join(replaced)
    })
  }
  return content
}
