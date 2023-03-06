import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { cardClass } from './styles'
import { isRTL } from '../config'
import { CardAccordionProps } from './Props'

const getChildId = <T extends { props: { [name: string]: any } }>(child: T, i: number) => {
  if (child && child.props && child.props.id !== undefined) return child.props.id
  return i
}

class Accordion<T = string> extends PureComponent<CardAccordionProps<T>, { active?: T | null }> {
  static defaultProps = {
    defaultActive: 0,
  }

  constructor(props: CardAccordionProps<T>) {
    super(props)

    this.state = {
      active: props.active || props.defaultActive,
    }
  }

  getActive() {
    if (this.props.active !== undefined) return this.props.active
    return this.state.active
  }

  handleActive(active: T | null) {
    if (active === this.state.active) active = null
    this.setState({ active })
    if (this.props.onChange) this.props.onChange(active)
  }

  render() {
    const active = this.getActive()
    return Children.toArray(this.props.children).map((child, i) => {
      const childId = getChildId((child as unknown) as React.Component<T>, i)
      const props = {
        collapsed: active !== childId,
        collapsible: true,
        className: classnames(
          typeof child === 'object' && ((child as unknown) as Element).className,
          cardClass('accordion', isRTL() && 'accordion-rtl')
        ),
        onCollapse: this.handleActive.bind(this, childId),
      }
      return cloneElement(child as any, props)
    })
  }
}

export default Accordion
