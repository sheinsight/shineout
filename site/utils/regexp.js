export function getMatched(content, reg) {
  let matched
  const groups = []
  // eslint-disable-next-line no-cond-assign
  while ((matched = reg.exec(content))) {
    const [line, hint] = matched
    if (hint) groups.push(hint)
    const { index } = matched
    const scaned = line.length + index
    content = content.substring(scaned)
  }
  return groups
}
