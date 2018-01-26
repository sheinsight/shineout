import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

export default markdown(loader)
