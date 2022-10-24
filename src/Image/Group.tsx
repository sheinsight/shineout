import React, { PureComponent, Children, cloneElement, ReactElement } from 'react'
import showGallery from './events'
import { IMAGE } from './Image'
import { imageClass } from './styles'
import { ImageProps, ImageGroupProps } from './interface'

class Group extends PureComponent<ImageGroupProps> {
  static displayName: string

  handleClick(index: number) {
    const { children } = this.props
    const images: {}[] = []
    let current = 0
    Children.toArray(children).forEach((child: ReactElement<ImageProps> & { type: { symbolType: {} } }, i) => {
      if (child && child.type && child.type.symbolType === IMAGE) {
        if (index === i) current = images.length
        const { src, href } = child.props
        images.push({ thumb: src, src: href || src, key: i })
      }
    })

    showGallery(images, current)
  }

  render() {
    const { children, pile, style, ...props } = this.props
    return (
      <div className={imageClass('group', pile && 'pile')} style={style}>
        {Children.toArray(this.props.children).map((child: ReactElement<ImageProps>, i) =>
          cloneElement(child, {
            ...props,
            onClick: this.handleClick.bind(this, i),
          })
        )}
      </div>
    )
  }
}

export default Group
