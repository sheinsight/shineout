import Tag from './Tag'
import Input from './Input'

const Exports: any = Tag
Exports.Input = Input

Exports.displayName = 'ShinoutTag'

export default Exports as typeof Tag & {
  Input: typeof Input
}
