import _Card from './Card'
import Submit from './Submit'
import { consumer } from './context'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Accordion from './Accordion'
import { CardType } from "./Props"

const Card: any = _Card
Card.Header = consumer(Header, ['collapsed', 'onCollapse'])
Card.Body = consumer(Body, ['collapsed', 'collapsible', 'onCollapse'])
Card.Footer = Footer
Card.Submit = consumer(Submit, ['onSubmit', 'formStatus'])
Card.Accordion = Accordion

Card.Body.displayName = 'ShineoutCardBody'
Card.Header.displayName = 'ShineoutCardHeader'
Card.displayName = 'ShineoutCard'

export default  Card as CardType
