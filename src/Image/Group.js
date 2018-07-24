import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import showGallery from './events'
import { IMAGE } from './Image'
import { imageClass } from '../styles'

class Group extends PureComponent {
  handleClick(index) {
    const { children } = this.props
    const images = []
    let current = 0
    Children.toArray(children).forEach((child, i) => {
      if (child && child.type && child.type.symbolType === IMAGE) {
        if (index === i) current = images.length
        const { src, href } = child.props
        images.push({ thumb: src, src: href || src })
      }
    })

    showGallery(images, current)
  }

  render() {
    const {
      children, pile, style, ...props
    } = this.props
    return (
      <div className={imageClass('group', pile && 'pile')} style={style}>
        {
          Children.toArray(this.props.children)
            .map((child, i) => cloneElement(child, {
              ...props,
              onClick: this.handleClick.bind(this, i),
            }))
        }
      </div>
    )
  }
}

Group.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  pile: PropTypes.bool,
  style: PropTypes.object,
}

export default Group
