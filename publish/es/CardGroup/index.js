import CardGroup from './CardGroup';
import Item from './Item';
import { consumer } from './context';
CardGroup.Item = consumer(Item);
Item.displayName = 'ShineoutCardGroupItem';
CardGroup.displayName = 'ShineoutCardGroup';
export default CardGroup;