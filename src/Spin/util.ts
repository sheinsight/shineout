export function formatSize(size: string | number) {
  const ss = /^(\d+)([%|\w]*)$/.exec(String(size)) || []
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px',
  }
}
