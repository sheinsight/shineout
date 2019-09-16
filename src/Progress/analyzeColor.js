export default color => {
  if (color.from) {
    return [{ pos: '0%', color: color.from }, { pos: '100%', color: color.to }]
  }

  return Object.keys(color)
    .sort((a, b) => window.parseInt(a) - window.parseInt(b))
    .reduce((p, v) => {
      p.push({ pos: v, color: color[v] })
      return p
    }, [])
}
