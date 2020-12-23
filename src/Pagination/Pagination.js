import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { paginationClass } from '../styles'
import Links from './Links'
import Jumper from './Jumper'
import Simple from './Simple'
import PageSizeList from './PageSizeList'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'

class Pagination extends PureComponent {
  render() {
    const { align, layout, size, style } = this.props

    const rtl = isRTL()

    const className = classnames(paginationClass('_', size, align, rtl && 'rtl'), this.props.className)

    const sectionClassName = paginationClass('section')

    return (
      <div className={className} style={style} {...getDataset(this.props)}>
        {layout.map((section, i) => {
          switch (section) {
            case 'links':
              return <Links key={section} {...this.props} />
            case 'list':
              return <PageSizeList key={section} {...this.props} />
            case 'jumper':
              return <Jumper key={section} {...this.props} />
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

Pagination.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
  align: PropTypes.string,
  current: PropTypes.number.isRequired,
  layout: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
  ...defaultProps,
  layout: ['links'],
  span: 5,
  text: {},
}

export default Pagination
