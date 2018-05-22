import { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { cardClass } from '../styles'

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
    if (active === this.state.active) active = -1
    this.setState({ active })
    if (this.props.onChange) this.props.onChange(active)
  }

  render() {
    const { active } = this.state
    return Children.toArray(this.props.children).map((child, i) => {
      const props = {
        collapsed: active !== i,
        collapsible: true,
        className: classnames((typeof child === 'object') && child.className, cardClass('accordion')),
        onCollapse: this.handleActive.bind(this, i),
      }
      return cloneElement(child, props)
    })
  }
}

Accordion.propTypes = {
  active: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  defaultActive: PropTypes.number,
  onChange: PropTypes.func,
}

Accordion.defaultProps = {
  defaultActive: 0,
}

export default Accordion
