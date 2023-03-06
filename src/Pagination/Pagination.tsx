import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { defaultProps } from '../utils/defaultProps'
import { paginationClass } from './styles'
import Links from './Links'
import Jumper from './Jumper'
import Simple from './Simple'
import PageSizeList from './PageSizeList'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'
import { getDirectionClass } from '../utils/classname'
import { PaginationProps, LinksProps, PageSizeListProps, JumperProps } from './Props'

const DefaultValue = {
  ...defaultProps,
  layout: ['links'],
  span: 5,
  text: {},
}

class Pagination extends PureComponent<PaginationProps> {
  static defaultProps = DefaultValue

  render() {
    const { align, layout, size, style } = this.props

    const rtl = isRTL()

    const className = classnames(paginationClass('_', size, align, rtl && 'rtl'), this.props.className)

    const sectionClassName = paginationClass(getDirectionClass('section'))

    return (
      <div className={className} style={style} {...getDataset(this.props)}>
        {layout!.map((section, i) => {
          switch (section) {
            case 'links':
              return <Links key={section} {...this.props as LinksProps} />
            case 'list':
              return <PageSizeList key={section} {...this.props as PageSizeListProps} />
            case 'jumper':
              return <Jumper key={section} {...this.props as JumperProps} />
            case 'simple':
              return <Simple key={section} {...this.props} />
            default:
              if (typeof section === 'function') {
                return (
                  <div key={i} className={sectionClassName}>
                    <span>{section(this.props)}</span>
                  </div>
                )
              }
              return null
          }
        })}
      </div>
    )
  }
}

export default Pagination
