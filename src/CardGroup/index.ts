import CardGroup from './CardGroup'
import Item from './Item'
import { consumer } from './context'
import { CardGroupType } from "./Props"

const Exports: any = CardGroup

Exports.Item = consumer(Item)

Exports.displayName = 'ShineoutCardGroupItem'
Exports.displayName = 'ShineoutCardGroup'

export default Exports as CardGroupType
