function format(columns, data, nextRow, index) {
  const row = columns.map((col, i) => {
    const content = typeof col.render === 'string'
      ? data[col.render]
      : col.render(data, index)
    const cell = { content, index }
    let { rowSpan } = col
    if (typeof rowSpan === 'boolean') {
      rowSpan = (a, b) => ((a === b) ? a : false)
    }

    if (rowSpan && nextRow) {
      const mc = rowSpan(content, nextRow[i].content)
      if (mc) {
        cell.content = mc
        cell.rowSpan = (nextRow[i].rowSpan || 1) + 1
        nextRow[i] = null
      }
    }

    return cell
  })

  return row
}

export default function (index, data, columns) {
  const rows = []
  for (let i = data.length - 1; i >= 0; i--) {
    const d = data[i]
    rows.unshift(format(columns, d, rows[0], index + i))
  }

  return rows
}
