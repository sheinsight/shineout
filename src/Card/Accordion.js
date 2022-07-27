import { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { cardClass } from './styles'
import { isRTL } from '../config'

const getChildId = (child, i) => {
  if (child && child.props && child.props.id !== undefined) return child.props.id
  return i
}

class Accordion extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      active: props.active || props.defaultActive,
    }
  }

  getActive() {
    if (this.props.active !== undefined) return this.props.active
    return this.state.active
  }

  handleActive(active) {
    if (active === this.state.active) active = null
    this.setState({ active })
    if (this.props.onChange) this.props.onChange(active)
  }

  render() {
    const active = this.getActive()
    return Children.toArray(this.props.children).map((child, i) => {
      const childId = getChildId(child, i)
      const props = {
        collapsed: active !== childId,
        collapsible: true,
        className: classnames(
          typeof child === 'object' && child.className,
          cardClass('accordion', isRTL && 'accordion-rtl')
        ),
        onCollapse: this.handleActive.bind(this, childId),
      }
      return cloneElement(child, props)
    })
  }
}

Accordion.propTypes = {
  active: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  defaultActive: PropTypes.any,
  onChange: PropTypes.func,
}

Accordion.defaultProps = {
  defaultActive: 0,
}

export default Accordion
