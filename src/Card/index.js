import Card from './Card'
import Submit from './Submit'
import panel from './Panel'
import { consumer } from './context'
import Header from './Header'

Card.Header = consumer(Header, ['collapsed', 'onCollapse'])
Card.Body = panel('body')
Card.Footer = panel('footer')
Card.Submit = consumer(Submit, ['onSubmit'])

export default Card
