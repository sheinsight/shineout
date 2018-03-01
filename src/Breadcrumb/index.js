import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { breadcrumbClass } from '../styles'

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      data, separator,
    } = this.props
    const className = classnames(
      breadcrumbClass('_'),
      this.props.className,
    )
    return (
      <div className={className} >
        {
          data.map((da, index) => (
            <span key={index}>
              <span><a href={da.url ? da.url : 'javascript:;'}>{da.icon}{da.title}</a></span>
              {
                index !== data.length - 1 ?
                  <span>{separator}</span> : null
              }
            </span>
          ))
        }
      </div>)
  }
}

Breadcrumb.propTypes = {
  ...getProps(),
  dataSource: PropTypes.array,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  icon: PropTypes.element,
}

Breadcrumb.defaultProps = {
  ...defaultProps,
  dataSource: [],
  separator: '/',
}

export default Breadcrumb
