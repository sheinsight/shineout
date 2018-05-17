import { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import showGallery from './events'
import Image from './Image'

class Group extends PureComponent {
  handleClick(index) {
    const { children } = this.props
    const images = []
    let current = 0
    Children.toArray(children).forEach((child, i) => {
      if (child && child.type === Image) {
        if (index === i) current = images.length
        const { src, href } = child.props
        images.push({ thumb: src, src: href || src })
      }
    })

    showGallery(images, current)
  }

  render() {
    const { children, ...props } = this.props
    return Children.toArray(this.props.children)
      .map((child, i) => cloneElement(child, { ...props, onClick: this.handleClick.bind(this, i) }))
  }
}

Group.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
}

export default Group
