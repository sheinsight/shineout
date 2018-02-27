function format(columns, data, nextRow, index) {
  const row = columns.map((col, i) => {
    const content = typeof col.render === 'string'
      ? data[col.render]
      : col.render(data, index)
    const cell = { content, index, data }
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1
    if (cell.colSpan < 1) cell.colSpan = 1

    const { rowSpan } = col
    if (rowSpan && nextRow) {
      const isEqual = rowSpan === true
        ? content === nextRow[i].content
        : typeof rowSpan === 'function' && rowSpan(data, nextRow[i].data)

      const nextTd = nextRow[i]
      if (isEqual && nextTd.colSpan === cell.colSpan) {
        cell.rowSpan = (nextTd.rowSpan || 1) + 1
        let j = cell.colSpan || 1
        while (j) {
          j -= 1
          nextRow[i + j] = null
        }
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
