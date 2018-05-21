import Card from './Card'
import Submit from './Submit'
import { consumer } from './context'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

Card.Header = consumer(Header, ['collapsed', 'onCollapse'])
Card.Body = consumer(Body, ['collapsed', 'collapsible'])
Card.Footer = Footer
Card.Submit = consumer(Submit, ['onSubmit'])

export default Card
